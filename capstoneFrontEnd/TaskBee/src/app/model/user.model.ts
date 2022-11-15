import { TaskList } from "./task-list.model";

export class User {
    email: String|null|undefined;
    password:String|null|undefined="";
    name:String|null|undefined="";
    phoneNumber:String|null|undefined="";
    taskList:Array<TaskList>=[];

}
