using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static OnlineStore.Functions.OnlineStore.LowStockFunction;

namespace OnlineStore.Functions.Services
{
    public interface ILowStockService
    {
        Task<List<ProductStock>> GetLowStockAsync(int threshold);
    }
}
