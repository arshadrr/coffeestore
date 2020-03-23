export default class Truck {
		constructor (truckId, db) {
				this.truckId = truckId;
				this.db = db;
		}

		createOrder (order) {
				console.log('Adding order for ' + order.get("email"));
				this.db.set(order.get("email"), order);
		}

		deliverOrder (customerId) {
				console.log('Delivering order for ' + customerId);
				this.db.delete(customerId);
		}

		printOrders () {
				let customerIds = this.db.keys();
				console.log('Truck #' + this.truckId + ' has pending orders:');
				customerIds.foreach(id => console.log(this.db.get(id)));
		}
}
