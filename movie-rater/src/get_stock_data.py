from yahoo_fin import stock_info as si
import datetime

class intra_day_data:

    def __init__(self, symbol, interval=1):
        self.interval = interval
        self.symbol = symbol
        self.list = []
        self.checkpoint = datetime.datetime(2020, 9, 24, 22, 28, 18, 200508)

    def collect(self):
        time_now = datetime.datetime.now()
        price = round(si.get_live_price(symbol),6)
        timestamp = time_now.strftime("%Y-%m-%d %H:%M:%S")
        time_diff = time_now - self.checkpoint
        if time_diff.seconds>self.interval:
            
            self.list.append([timestamp, price])

        return( {
            'current': [timestamp, price],
            'intra_day': self.list
        })


interval=1
get_data = intra_day_data(symbol = "ALT", interval=interval)

for f in range(10):
    data = get_data.collect()
    
    sys.stdout.write("\r" + str(data))
    sys.stdout.flush()
    time.sleep(interval)