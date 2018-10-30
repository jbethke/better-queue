import { ETA } from 'node-eta';

declare class Ticket {

	public isAccepted : boolean;
	public isQueued : boolean;
	public isStarted : boolean;
	public isFailed : boolean;
	public isfinished : boolean;
	public result? : any;
	public status : TicketStatus;
	public eta : ETA;

	/**
	 * Called when Ticket is accepted.
	 * Status is 'accepted'
	 * Event 'accepted' is emitted
	 */
	public accept ();

	/**
	 * Called when Ticket is queued.
	 * Status is 'queued'
	 * Event 'queued' is emitted
	 */
	public queued ();

	/**
	 * Called when Ticket is unqueued.
	 * Status is 'accepted'
	 * Event 'unqueued' is emitted
	 */
	public unqueued ();

	/**
	 * Called when Ticket has started.
	 * Status is 'in-progress'
	 * Event 'started' is emitted
	 */
	public started ();

	/**
	 * Called when Ticket has failed.
	 * Status is 'failed'
	 * Event 'failed' is emitted
	 */
	public failed ();

	/**
	 * Called when Ticket is finished.
	 * Status is 'finished'
	 * Event 'finish' is emitted
	 */
	public finish ();

	/**
	 * Called when Ticket is stopped.
	 * Status is 'queued'
	 * Event 'stopped' is emitted
	 */
	public stopped ();

	/**
	 * Called when task progresses
	 * Event 'progress' is emitted
	 */
	public progress ();

	public on (
		event : TicketEvent,
		callBack : Function
	)
}


declare type TicketStatus =
	"created" |
	"accepted" |
	"queued" |
	"in-progress" |
	"failed" |
	"finished"
;

declare type TicketEvent =
	"accepted" |
	"queued" |
	"unqueued" |
	"started" |
	"failed" |
	"finish" |
	"stopped" |
	"progress"
;

declare interface TicketProgressEventResponse {
	complete: number;
	total: number;
	pct: number;
	eta: string;
	message: string;
}
