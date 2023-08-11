import ticketModel from "../models/tickets.js";

export default class TicketService {
  constructor() {
    // console.log("Working products with Database persistence in mongodb");
  }

  addTicket = async (ticket) => {
    try {
      let result = await ticketModel.create(ticket);
      console.log(`Se cargo el ticket ${ticket.code}`);
      console.log(`RESULTADO: ${JSON.stringify(result, null, "\t")}`);
      return result;
    } catch (err) {
      console.error(`ERROR cargando el ticket: ${err}`);
      return result;
    }
  };

  getTickets = async (limit, page, sort, query) => {
    try {
      // let courses = await productsModel.find();

      let limite = limit ? limit : 10;
      let pag = page ? page : 1;
      let orden = sort ? { price: sort } : {};
      let objQuery = query ? query : {};

      let prod = await ticketModel.paginate(objQuery, {
        limit: limite,
        page: pag,
        sort: orden,
        lean: true,
      });

      return prod;
    } catch (err) {
      console.error(`ERROR obteniendo el ticket: ${err}`);
      return [];
    }
  };

  getTicketById = async (id) => {
    try {
      let courses = await ticketModel.findOne({ _id: id });

      return courses;
    } catch (err) {
      console.error(`ERROR obteniendo el Ticket por ID: ${err}`);
      return [];
    }
  };

  updateTicketById = async (id, product) => {
    try {
      let { _id, ...rest } = product;

      let result = await ticketModel.updateOne({ _id: id }, rest);

      console.log(`El ticket id: ${id} fue actualizado correctamente`);
      return result;
    } catch (err) {
      console.error(`ERROR actualizando el ticket: ${err}`);
    }
  };

  deleteTicketById = async (id) => {
    let msg = "";
    try {
      let result = await ticketModel.deleteOne({ _id: id });
      console.log(`Se cargo el ticket ${result}`);
    } catch (err) {
      msg = `ERROR borrando Ticket por ID: ${err}`;
    } finally {
      console.log(msg);
    }
  };
}
