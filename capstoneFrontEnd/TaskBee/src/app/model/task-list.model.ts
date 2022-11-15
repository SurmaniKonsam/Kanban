import { TaskCard } from "./task-card.model";
import { User } from "./user.model";


export class TaskList {
    taskListName:String|undefined|null;
    category:Array<String|null|undefined>=[];
    date: null | String | undefined;
    listOfTasksInProject:Array<TaskCard>=[];
    projectPriority:String|undefined|null;
    listOfUsers:Array<User>|Array<String>=[];
}
