// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.mjs";

async function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3
  };

  const database = await central(id);

  const result = await Promise.all([dbs[database](id), vault(id)]).then(([userInfo, vaultInfo]) => {
    return {'id':id, ...userInfo, ...vaultInfo}
  });

  console.log(result);
  return result;
}


console.time('getUserData');
getUserData(5);
console.timeEnd('getUserData');
