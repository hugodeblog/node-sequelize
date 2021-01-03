import Sequelize from 'sequelize';
import { default as jsyaml } from 'js-yaml';
import * as util from 'util';
import { promises as fs } from 'fs';

class User extends Sequelize.Model {}

let sequlz;

async function connectDB() {

  if(sequlz) return sequlz;

  const yamltext = await fs.readFile('sequelize-sqlite.yaml', 'utf8');
  const params = await jsyaml.safeLoad(yamltext, 'utf8');

  sequlz = new Sequelize(
    params.dbname,
    params.uesrname,
    params.password,
    params.params
  );

  User.init({
    username: {type: Sequelize.STRING, unique: true},
    password: Sequelize.STRING,
    address: Sequelize.STRING
  }, {
    sequelize: sequlz,
    modelName: 'User',
    timestamps: true
  });

  await User.sync({ force: true });
}


async function closeDB() {

  if (sequlz) sequlz.close();
  sequlz = undefined;

}

// Insert
async function create(user, pass, address) {
   await connectDB();
   const result = await User.create( {
     username:user, password:pass, address:address
   });
}

async function update(user, pass, address) {
  await connectDB();
  var result = await User.findOne( {where:{username:user} });
  if(!result) {
    throw new Error(`Not found for ${user}`);
  } else {
    await User.update(
      {password:pass, address:address},
      {where:{username:user}}
    );
    result = await User.findOne( {where:{username:user} });
  }
}

async function destroy(user) {
  await connectDB();
  var result = await User.findOne( {where:{username:user} });
  if(!result) {
    throw new Error(`Not found for ${user}`);
  } else {
    await User.destroy( {where: {username: user} });
  }
}

async function readall() {
  await connectDB();
  const results = await User.findAll({});
  console.log('currentDB status:');
  console.log(results.map(result => (
    {'username': result.username, 'password':result.password, 'address':result.address}
  )));
}

(async () => {

  console.log('******** Sequelizeテストスタート ********');

  try {
    await connectDB();

    console.log('******** データ作成 ********');
    await create('taro', 'taro123', 'Tokyo');
    await create('jiro', 'jiro456', 'Osaka');
    await create('sabro', 'jiro789', 'Hokkaido');
    await readall();

    console.log('******** jiroのデータアップート ********');
    await update('jiro', '456jiro', 'Kanagawa');
    await readall();

    console.log('******** taroのデータ削除 ********');
    await　destroy('taro');
    await readall();



  } catch (err) {
    console.error(err);
    console.log('エラーが出たのでテストを終了します');
  } finally {
    console.log('******** Sequelizeテスト終了 ********');
    closeDB();
  }
})();
