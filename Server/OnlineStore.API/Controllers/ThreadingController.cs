using Microsoft.AspNetCore.Mvc;
using System.Collections.Concurrent;

namespace OnlineStore.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ThreadingController : ControllerBase
    {

        //drill 1
        [HttpGet("race")]
        public async Task<IActionResult> Race()
        {
            int counter = 0;
            var task1 = Task.Run(() =>
            {
                for (int i = 0; i < 100000; i++)
                {
                    counter++;
                }
            });

            CancellationTokenSource canSource = new CancellationTokenSource();
            CancellationToken canceltoken = canSource.Token;

            var task2 = Task.Run(() =>
            {
                for (int i = 0; i < 100000; i++)
                {
                    counter++;
                    if (counter > 180000)
                    {
                        canSource.Cancel();
                    }
                    if (canceltoken.IsCancellationRequested)
                        break;
                }
            }, canceltoken);

            await Task.WhenAll(task1, task2);

            return Ok(new { counter, expected = 67 });
        }


        [HttpGet("lockrace")]
        public async Task<IActionResult> lockRace()
        {
            var counter = 0;
            /* CancellationTokenSource cs = new CancellationTokenSource();
             CancellationToken csToken = cs.Token;*/
            var locker = new object();

            var task1 = Task.Run(() =>
            {
                for (int i = 0; i < 20000; i++)
                {
                    lock (locker)
                    {
                        counter++;

                    }
                }
            });

            /*CancellationTokenSource cs2 = new CancellationTokenSource();
            CancellationToken csToken2 = cs2.Token;*/

            var task2 = Task.Run(() =>
            {
                for (int i = 0; i < 20000; i++)
                {
                    lock (locker)
                    {
                        counter++;
                    }
                }
            });

            await Task.WhenAll(task1, task2);
            return Ok(new { counter, expected = 400000 });
        }

        [HttpGet("InterLock")]

        public async Task<IActionResult> InterLockedRace()
        {
            var counter = 0;
            var locker = new object();
            var task = Task.Run(() =>
            {
                for (int i = 0; i < 20000; i++)
                {
                    Interlocked.Increment(ref counter);
                }
            });
            var task2 = Task.Run(() =>
            {
                for (int i = 0; i < 20000; i++)
                {
                    Interlocked.Increment(ref counter);
                }
            });


            await Task.WhenAll(task, task2);
            return Ok(new { counter, expected = 40000 });
        }

        [HttpGet("parallelsum")]
        public async Task<IActionResult> parallelsum()
        {
            var numbers = Enumerable.Range(1, 1000000).ToArray();
            Task<long> task1 = Task.Run(() =>
            {
                long SUM = 0;
                for (int i = 0; i <= 499999; i++)
                {
                    SUM += numbers[i];
                }
                return SUM;
            });

            Task<long> task2 = Task.Run(() =>
            {
                long SUM = 0;
                for (int i = 500000; i <= 999999; i++)
                {
                    SUM += numbers[i];
                }
                return SUM;
            });
            await Task.WhenAll(task1, task2);
            long total = task1.Result + task2.Result;
            return Ok(new { total, expected = 5000050000 });
        }

        [HttpGet("parallel-demo")]
        public IActionResult parallelsum2()
        {
            var fruits = new[] { "apple", "mango", "strwberry", "orangr", "Kiwi" };

            var results = new ConcurrentBag<string>();

            Parallel.ForEach(fruits, fruit =>
            {
                int thread = Environment.CurrentManagedThreadId;
                results.Add($"{fruit} handled by thread {thread}");
            });
            return Ok(results);
        }

    }
}
