using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactCheesecakeOrdering.Data
{
    public class CheesecakeRepository
    {
        private readonly string _connectionString;
        public CheesecakeRepository(string conStr)
        {
            _connectionString = conStr;
        }
        public List<CheesecakeOrder> GetAll()
        {
            using var context = new CheesecakeBackendDataContext(_connectionString);
            return context.Orders.ToList();
        }

        public CheesecakeOrder Get(int id)
        {
            using var context = new CheesecakeBackendDataContext(_connectionString);
            return context.Orders.FirstOrDefault(o => o.Id == id);
        }
        public void PlaceOrder(CheesecakeOrder order)
        {
            using var ctx = new CheesecakeBackendDataContext(_connectionString);
            ctx.Orders.Add(order);
            ctx.SaveChanges();
        }


    }
}
