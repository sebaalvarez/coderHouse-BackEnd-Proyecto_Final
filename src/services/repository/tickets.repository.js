export default class TicketsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  addTicket = (ticket) => {
    return this.dao.addTicket(ticket);
  };

  getTickets = (limit, page, sort, query) => {
    return this.dao.getTickets(limit, page, sort, query);
  };

  getTicketById = (id) => {
    return this.dao.getTicketById(id);
  };

  updateTicketById = (id, product) => {
    return this.dao.updateTicketById(id, product);
  };

  deleteTicketById = (id) => {
    return this.dao.deleteTicketById(id);
  };
}
