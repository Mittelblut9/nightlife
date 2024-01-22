import dotenv from 'dotenv';
if(process.env.NODE_ENV === 'test') {
    dotenv.config({
        path: '.env.test'
    });
}else {
    dotenv.config();
}
 
import { Sequelize } from 'sequelize';
import SequelizeModel from 'sequelize/lib/model';
import fs from 'fs';
import { setDBRunning } from '~shared/variables.js';

const database = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        retry: {
            max: 7,
        },
        define: {
            freezeTableName: true,
            timestamps: false,
        },
    }
);

database.init = () => {
    return new Promise((resolve, reject) => {
        const orgFindAll = SequelizeModel.findAll;
        SequelizeModel.findAll = function () {
            return orgFindAll.apply(this, arguments).catch((err) => {
                throw err;
            });
        };
        const orgFindOne = SequelizeModel.findOne;
        SequelizeModel.findOne = function () {
            return orgFindOne.apply(this, arguments).catch((err) => {
                throw err;
            });
        };
        const orgFindOrCreate = SequelizeModel.findOrCreate;
        SequelizeModel.findOrCreate = function () {
            return orgFindOrCreate.apply(this, arguments).catch((err) => {
                throw err;
            });
        };
        const orgCreate = SequelizeModel.create;
        SequelizeModel.create = function () {
            return orgCreate.apply(this, arguments).catch((err) => {
                throw err;
            });
        };
        const orgUpdate = SequelizeModel.update;
        SequelizeModel.update = function () {
            return orgUpdate.apply(this, arguments).catch((err) => {
                throw err;
            });
        };
        const orgDestroy = SequelizeModel.destroy;
        SequelizeModel.destroy = function () {
            return orgDestroy.apply(this, arguments).catch((err) => {
                throw err;
            });
        };

        database
            .authenticate()
            .then(() => {
                fs.readdirSync('./resources/roleplay/server/_db/models').forEach(async (file) => {
                    if (!file.includes('.model')) return;
                    console.info('Loading model: ' + file);
                    import('../_db/models/' + file);
                });
            })
            .catch((err) => {
                console.info('Unable to connect to the database:', err);
                reject(err);
            });


        
        setTimeout(async () => {
            console.info(`Syncing database ${JSON.parse(process.env.DB_FORCE_SYNC) ? 'forced' : ''}`);
            await database.sync({
                alter: true,
                force: process.env.DB_FORCE_SYNC === 'true',
            });

            const serverPath = './resources/roleplay/server';
            const dataMigrationPath = `/_db/data_migration${process.env.NODE_ENV === 'test' ? '_tests' : ''}/`;

            let queue = [];

            fs.readdirSync(serverPath + dataMigrationPath).forEach(async (file) => {
                if (!file.includes('.default')) return;
                console.info('Loading data migration: ' + file);
                const migrationFile = await import('../' + dataMigrationPath + file);
                const queuePosition = migrationFile.queuePosition;

                if(queue[queuePosition] !== undefined) {
                    throw new Error(`Duplicate queue position ${queuePosition} in ${file}`);
                }
                queue[queuePosition] = migrationFile;
            });

            setTimeout(async () => {
                queue = queue.filter((item) => item !== undefined);
                for (let i = 0; i < queue.length; i++) {
                    console.info(`Running data migration ${i + 1}/${queue.length}`);
                    await queue[i].execute();
                }
            }, 1000);

  
            setDBRunning(true);
        }, 1000);

        database.afterSync((connection) => {
            console.info(`Successfully synced ${connection.name.plural}.`);
        });

        resolve(true);
    });
};

export default database;