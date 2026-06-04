using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactCheesecakeOrdering.Data
{
  
    public class CheesecakeOrder
    {
        public int Id { get; set; }
        public string CustomerName { get; set; }
        public string Email { get; set; }
        public string BaseFlavor { get; set; }
        public string Toppings { get; set; }
        public int Quantity { get; set; }
        public DateTime DeliveryDate { get; set; }
        public  string?  SpecialRequests { get; set; }
    }

}
