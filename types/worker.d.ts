

declare class Worker {

	public fn : Function;
	public batch : any;
	public single : any;
	public active : boolean;
	public cancelled : boolean;
	public failTaskOnProcessException : boolean;
	public status? : WorkerStatus;
	public progress? : WorkerProgress;
	public counts? : WorkerCounts;


	constructor(options : WorkerOptions);

	public setup ();

	public start ();

	public end ();

	public resume();

	public pause ();

	public cancel ();

	public failedBatch (message : string);

	public failedTask (id: string, message: string);

	public finishBatch (result : any);

	public finishTask (id: string, result : any);

	public progressBatch (complete: number, total: number, message: string);

	public progressTask (id: string, complete: number, total: number, message: string);

	public on (event : WorkerEvent, callBack: Function);
}

declare interface WorkerOptions {
	fn : Function;
	batch : any;
	single : any;
	failTaskOnProcessException : boolean;
}

declare type WorkerStatus =
	"ready" |
	"finished" |
	"in-progress" |
	"paused";

declare type WorkerEvent =
	"task_progress" |
	"task_finish" |
	"task_failed" |
	"failed" |
	"finish" |
	"end" |
	"progress";

declare interface WorkerCounts {
	finished: number;
	failed: number;
	completed: number;
	total: number;
}

declare interface WorkerProgress {
	tasks : { [ id: string ] : any};
	complete: number;
	total: number;
	eta: string;
}
