public Task<JsonResult> GetKline(long? size, long? since, string type)
     {
         //type表示几分钟线
         if (size > 0)   //表示请求的历史数据
         {
             if (this.HttpContext.Cache["closePrice"] == null)
             {
                 var openprice= new Random().Next(16000, 20000);
                 this.HttpContext.Cache["closePrice"] = openprice;
             }
             return Task.Factory.StartNew(() =>
             {
                 List<object> list = GetList();
                 var data = new
                 {
                     des = "注释",
                     isSuc = true,//状态
                     datas = new
                     {
                         USDCNY = 6.83,//RMB汇率  
                         contractUnit = "BTC",
                         data = list,
                         marketName = "币柜网",
                         moneyType = "CNY",
                         symbol = "btc38btccny",
                         url = "官网地址",//（选填）
                         topTickers = new List<object>()//（选填）
                     }
                 };
                 Response.AddHeader("Access-Control-Allow-Origin", "*");
                 return Json(data);
             });
         }
         else
         {
             //1分钟线即时数据
             if (type == "1min")
             {
                 return Task.Factory.StartNew(() =>
                 {
                     //本地时间戳
                     TimeSpan cha = (DateTime.Now - TimeZone.CurrentTimeZone.ToLocalTime(new System.DateTime(1970, 1, 1)));
                     long unix = (long)cha.TotalSeconds;
                     List<object> list = new List<object>();
                     var rand = new Random();
                     if (this.HttpContext.Cache["closePrice"]!=null)
                     {
                         if (Convert.ToDecimal(this.HttpContext.Cache["closePrice"])<16000)
                         {
                             this.HttpContext.Cache["closePrice"]= rand.Next(16000, 20000);
                         }
                     }
                     //开盘价
                     decimal openPrice = Convert.ToDecimal(this.HttpContext.Cache["closePrice"]);//rand.Next(16000, 20000);
                     //最高价
                     decimal heightPrice = openPrice + rand.Next(0, 200);
                     //最低价
                     decimal lowPrice = openPrice - rand.Next(1, 200);
                     //收盘价
                     decimal closePrice = lowPrice + rand.Next(0, 200);
                     this.HttpContext.Cache["closePrice"] = closePrice;
                     //成交量
                     double amount = Math.Round(rand.NextDouble() * 100, 4, MidpointRounding.AwayFromZero);
                     var objArr = new object[] {
                         unix*1000,//时间
                         openPrice,//开盘价
                         heightPrice,//高
                         lowPrice,//低
                         closePrice,//收盘价
                         amount//量
                     };
                     list.Add(objArr);
                     var data = new
                     {
                         des = "注释",
                         isSuc = true,//状态
                         datas = new
                         {
                             USDCNY = 6.83,//RMB汇率
                             contractUnit = "BTC",
                             data = list,
                             marketName = "币柜网",
                             moneyType = "CNY",
                             symbol = "btc38btccny",
                             url = "官网地址",//（选填）
                             topTickers = new List<object>()//（选填）
                         }
                     };
                     Response.AddHeader("Access-Control-Allow-Origin", "*");
                     return Json(data);
                 });
             }
             Response.AddHeader("Access-Control-Allow-Origin", "*");
             return null;
         }
     }

     public List<object> GetList()
     {
         List<object> list = new List<object>();
         list.Add(new object[] {
                 1499875200000,//时间
                 16580.0,//开盘价
                 16700.0,//高
                 16530.0,//低
                 16700.0,//收盘价
                 12.6415//量
             });
         list.Add(new object[] {
                 1499875200000,//时间
                 16680.0,//开盘价
                 16200.0,//高
                 16730.0,//低
                 16900.0,//收盘价
                 9.6415//量
             });
         list.Add(new object[] {
                 1499875200000,//时间
                 16552.0,//开盘价
                 16980.0,//高
                 16130.0,//低
                 16400.0,//收盘价
                 17.6415//量
             });
         list.Add(new object[] {
                 1499875200000,//时间
                 16580.0,//开盘价
                 16700.0,//高
                 16530.0,//低
                 16700.0,//收盘价
                 15.6415//量
             });
         list.Add(new object[] {
                 1499875200000,//时间
                 16580.0,//开盘价
                 16700.0,//高
                 16530.0,//低
                 16700.0,//收盘价
                 36.6415//量
             });
         list.Add(new object[] {
                 1499875200000,//时间
                 16580.0,//开盘价
                 16700.0,//高
                 16530.0,//低
                 16700.0,//收盘价
                 85.6415//量
             });
         list.Add(new object[] {
                 1499918040000,//时间
                 16630.0,//开盘价
                 16784.0,//高
                 16582.0,//低
                 16710.0,//收盘价
                 42.6415//量
             });
         list.Add(new object[] {
                 1499918280000,//时间
                 16580.0,//开盘价
                 16700.0,//高
                 16530.0,//低
                 16700.0,//收盘价
                 32.6415//量
             });
         list.Add(new object[] {
                 1499918400000,//时间
                 16580.0,//开盘价
                 16700.0,//高
                 16530.0,//低
                 16700.0,//收盘价
                 22.6415//量
             });
         list.Add(new object[] {
                 1499918760000,//时间
                 16580.0,//开盘价
                 16700.0,//高
                 16530.0,//低
                 16700.0,//收盘价
                 17.6415//量
             });
         list.Add(new object[] {
                 1499919000000,//时间
                 16548.0,//开盘价
                 16860.0,//高
                 16430.0,//低
                 16800.0,//收盘价
                 19.6415//量
             });
         return list;
     }
