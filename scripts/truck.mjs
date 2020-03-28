export default class Truck {
		constructor (truckId, db) {
				this.truckId = truckId;
				this.db = db;
		}

		createOrder (order) {
				console.log('Adding order for ' + order.get("orderid"));
				this.db.set(order.get("orderid"), order);
		}

		deliverOrder (orderID) {
				console.log('Delivering order for ' + orderID);
				this.db.delete(orderID);
		}

		printOrders () {
				let customerIds = this.db.keys();
				console.log('Truck #' + this.truckId + ' has pending orders:');
				customerIds.foreach(id => console.log(this.db.get(id)));
		}
}
