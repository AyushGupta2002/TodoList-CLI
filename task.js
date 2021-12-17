const fs = require('fs');

const inp = process.argv;

const path = __dirname + "/task.txt";

const arr = fs.readFileSync(path, 'utf-8').split("\r\n");

const task = arr.filter(e =>  e);

const position = inp[3];

let temp = [];

for(let i=0;i<task.length;i++) {

  const pri = task[i].substr(0,task[i].indexOf(' '));
  const tsk = task[i].substr(task[i].indexOf(' ')+1);

  const obj = new Object();
  obj.priority = pri;
  obj.task = tsk;
  temp.push(obj);
}


if (inp[2] === "add") {

  const newPriority = inp[3];
  const newTask = inp[4];

  const obj = new Object();
  obj.priority = newPriority;
  obj.task = newTask;

  let added = false;

  for(let i=0;i<temp.length;i++) {

    if (parseInt(temp[i].priority) > parseInt(obj.priority)) {

       temp.splice(i, 0, obj)
      added = true;
      break;
    }
  }
  if(added === false) temp.push(obj);

  console.log('Added task: "' + newTask + '" with priority ' + newPriority);

  let fin = [];
  for(let i=0;i<temp.length;i++) {
    fin.push(temp[i].priority + " " + temp[i].task);
  }

  const newData = fin.join('\r\n');
  fs.writeFileSync(path, newData, {encoding : 'utf-8'});

}
else if (inp[2] === "ls") {

    for(let i=0;i<temp.length;i++){
      const j=i+1;
      const liststr=j+". "+temp[i].task+" ["+temp[i].priority+"]";
      console.log(liststr);
    }

}

else if (inp[2] === "del") {

     let fin = [],flag=0;
   for(let i=0;i<temp.length;i++){
      const j=i+1;

     if(j==inp[3])
     {
       flag=1;
       continue;
     }
     else
     {
       fin.push(temp[i].priority + " " + temp[i].task);
     }

   }
   if(flag===1)
   {
     console.log("Deleted item with index "+inp[3]);

   }
   else
   {
      console.log("Error: item with index "+ inp[3] +" does not exist. Nothing deleted.");
   }


   const newData = fin.join('\r\n');
   fs.writeFileSync(path, newData, {encoding : 'utf-8'});
}

else if (inp[2] === "done") {

  let fin = [],flag=0;
for(let i=0;i<temp.length;i++){
   const j=i+1;

  if(j==inp[3])
  {

    flag=1;
    let content=temp[i].task+"\n";
      fs.appendFile("completed.txt",content,err=>{
        if(err){
          console.log(err);
        }
  })
}
  else
  {
    fin.push(temp[i].priority + " " + temp[i].task);
  }

}
if(flag===1)
{
  console.log("Marked item as done");
}
else{
  console.log("Error: no incomplete item with index " +inp[3]+" exists.");
}
const newData = fin.join('\r\n');
fs.writeFileSync(path, newData, {encoding : 'utf-8'});

}


else if (inp[2] === "report") {

  const path1 = __dirname + "/completed.txt";

  const arr1 = fs.readFileSync(path1, 'utf-8').split("\n");

  const task1 = arr1.filter(e =>  e);
  console.log("Pending: "+temp.length);
  for(let i=0;i<temp.length;i++){
    const j=i+1;
    const liststr=j+". "+temp[i].task+" ["+temp[i].priority+"]";
    console.log(liststr);
  }

  console.log("\n");
  console.log("Completed: "+task1.length);
  for(let i=0;i<task1.length;i++){
    const j=i+1;
    const liststr=j+". "+task1[i];
    console.log(liststr);
  }

}

else {
  fs.readFile("usage.txt", "UTF8", (err, data) => {
    if (err) {
      console.log(err);
     return;
   } else {
     console.log(data);
   }
 });
}
