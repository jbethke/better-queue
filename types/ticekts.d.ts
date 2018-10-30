import { Ticket } from './ticket';

declare class Tickets {
	protected tickets : Ticket[];

	public apply (
		fn : Function,
		args : any[]
	);

	public push (
		ticket : Ticket
	);

}
