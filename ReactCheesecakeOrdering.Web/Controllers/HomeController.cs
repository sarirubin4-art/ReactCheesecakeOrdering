using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ReactCheesecakeOrdering.Data;
using System.Collections.Generic;

namespace ReactCheesecakeOrdering.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly string _connectionString;
        public HomeController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpPost]
        [Route("placeorder")]
        public void PlaceOrder([FromBody] CheesecakeOrder order)
        {
            var repo = new CheesecakeRepository(_connectionString);
            repo.PlaceOrder(order);
        }

        [HttpGet]
        [Route("getorders")]
        public List<CheesecakeOrder> GetOrders()
        {
            var repo = new CheesecakeRepository(_connectionString);
            return repo.GetAll();
        }

        [HttpGet]
        [Route("getorder")]
        public CheesecakeOrder GetOrder(int id)
        {
            var repo = new CheesecakeRepository(_connectionString);
            return repo.Get(id);
        }
    }
}
