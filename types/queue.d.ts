import { Ticket } from './ticket';
import { Tickets } from './tickets';
import { Worker } from './worker';

declare class Queue {

	public process : QueueProcessFunction;
	public filter : QueueFilterFunction;
	public merge : QueueMergeFunction;
	public precondition : QueuePreconditionFunction;
	public setImmediate : Function;
	public id : string;
	public priority? : Function;

	public cancelIfRunning : boolean;
	public autoResume : boolean;
	public failTaskOnProcessException : boolean;
	public filo : boolean;
	public batchSize : number;
	public batchDelay : number;
	public batchDelayTimeout : number;
	public afterPRocessDelay : number;
	public concurrent : number;
	public maxTimeout : number;
	public maxRetries : number;
	public retryDelay : number;
	public storeMaxRetries : number;
	public storeRetryTimeout : number;
	public preconditionRetryTieout: number;


	constructor(process : QueueProcess | QueueOptions, options?: QueueOptions);

	/**
	 * Push a task onto the queue, with an optional callback when it completes.
	 * @param  task     Object representing task to be passed to QueueProcess.
	 * @param  callBack Function to be invoked after task is complete.
	 * @return Ticket
	 */
	public push (
		task : QueueTask,
		callBack? : Function
	) => Ticket;

	/**
	 * Pauses the queue: tries to pause running tasks and prevents tasks from getting processed until resumed.
	 */
	public pause ( ) => void;

	/**
	 * Resumes the queue and its runnign tasks.
	 */
	public resume ( ) => void;

	/**
	 * Destroys the queue: closes the store, tries to clean up.
	 * @param  callBack Function called once destroy is complete
	 */
	public destroy (
		callBack? : Function
	) => void;

	/**
	 * Sets the queue to read from and write to the given store.
	 * @param  store store object
	 */
	public use (
		store : any
	) => void;

	/**
	 * Gets the aggregate stats for the queue.
	 * @return  an object with properties successRate, peak, total and average, representing the success rate on tasks, peak number of items queued, total number of items processed and average processing time, respectively.
	 */
	public getStats ( ) => QueueStats

	/**
	 * average processing time
	 */
	public resetStats ( ) => void;

	/**
	 * Attach an event listener
	 * @param  event    QueueEvent to listen to
	 * @param  callBack Function invoked when event occurs.
	 * @return          Queue object (to allow chaining)
	 */
	public on (
		event : QueueEvent,
		callBack : Function
	) => Queue;
}


declare type QueueProcessFunction = (
	task : QueueTask | QueueBatch,
	callBack? : QueueCallBack
) => void;

declare type QueueFilterFunction = (
	input : any,
	callBack? : QueueCallBack
) => void;

declare type QueueMergeFunction = (
	oldTask : QueueTask,
	newTask : QueueTask,
	callBack? : QueueCallBack
) => void;

declare type QueuePreconditionFunction = (
	callBack? : QueueCallBack
) => void;

declare type QueueCallBack = (
	error: any,
	result: any
) =>

declare interface QueueOptions {

	/**
	 * The property to use as the task ID. This can be a string or a function (for more complicated IDs). The function (task, cb) and must call the callback with cb(error, taskId).
	 */
	id? : string;


	/**
	 * If true, when a task with the same ID is running, its worker will be cancelled. Defaults to false.
	 */
	cancelIfRunning? : boolean;

	/**
	 * If true, tasks in the store will automatically start processing once it connects to the store. Defaults to true.
	 */
	autoResume? : boolean;

	/**
	 * If true, when the process function throws an error the batch fails. Defaults to true.
	 */
	failTaskOnProcessException? : boolean;

	/**
	 * If true, tasks will be completed in a first in, last out order. Defaults to false.
	 */
	filo? : boolean;

	/**
	 * The number of tasks (at most) that can be processed at once. Defaults to 1.
	 */
	batchSize? : number;

	/**
	 * Number of milliseconds to delay before starting to popping items off the queue. Defaults to 0.
	 */
	batchDelay? : number;

	/**
	 * Number of milliseconds to wait for a new task to arrive before firing off the batch. Defaults to Infinity.
	 */
	batchDelayTimeout? : number;

	/**
	 * Number of workers that can be running at any given time. Defaults to 1.
	 */
	concurrent? : number;

	/**
	 * Number of milliseconds before a task is considered timed out. Defaults to Infinity.
	 */
	maxTimeout? : number;

	/**
	 * Number of milliseconds to delay before processing the next batch of items. Defaults to 1.
	 */
	afterProcessDelay? : number;


	/**
	 * Maximum number of attempts to retry on a failed task. Defaults to 0.
	 */
	maxRetries? : number;


	/**
	 * Number of milliseconds before retrying. Defaults to 0.
	 */
	retryDelay? : number;

	/**
	 * Maximum number of attempts before giving up on the store. Defaults to Infinity.
	 */
	storeMaxRetries? : number;

	/**
	 * Number of milliseconds to delay before trying to connect to the store again. Defaults to 1000.
	 */
	storeRetryTimeout? : number;

	/**
	 * Number of milliseconds to delay before checking the precondition function again. Defaults to 1000.
	 */
	preconditionRetryTimeout? : number;

	/**
	 * Represents the options for the initial store. Can be an object containing { type: storeType, ... options ... }, or the store instance itself.
	 */
	store? : QueueStoreOptions;

}

declare interface QueueStoreOptions {
	type: string;
}

declare interface QueueTask {

}

/**
 * Object returned from Queue.getStats()
 */
declare interface QueueStats {

	/**
	 * success rate on tasks
	 */
	successRate: number;

	/**
	 * peak number of items queued
	 */
	peak: number;

	/**
	 * total number of items processed
	 */
	total: number;

	/**
	 * average processing time
	 */
	average: number;
}

declare type QueueEvent =

	/**
	 * When a task is queued
	 */
    "task_queued" |

	/**
	 * When a task is accepted
	 */
	"task_accepted" |

	/**
	 * When a task begins processing
	 */
	"task_started" |

	/**
	 * When a task is completed
	 */
	"task_finish" |

	/**
	 * When a task fails
	 */
	"task_failed" |

	/**
	 * When a task progress changes
	 */
	"task_progress" |

	/**
	 * When a batch of tasks (or worker) completes
	 */
	"batch_finish" |

	/**
	 * When a batch of tasks (or worker) fails
	 */
	"batch_failed" |

	/**
	 * When a batch of tasks (or worker) updates its progress
	 */
	"batch_progress"


}

exports Queue;
