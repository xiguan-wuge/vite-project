function getPerformanceData() {
  console.log('getPerformanceData')
  window.onload= function() {
    // console.log('采用timing', window.performance.timing)
    const timing = window.performance.timing
    // const start = window.performance.timing.domainLookupStart
    // const end = window.performance.timing.domainLookupEnd
    // console.log('domain', end-start)
    // const domLoading = window.performance.timing.domLoading
    // const domComplete = window.performance.timing.domComplete
    // console.log('domEnd', domComplete - domLoading)

    // const fp = timing.responseStart - timing.navigationStart
    // console.log('fp', fp);
    // const redirectTime = timing.redirectEnd - timing.redirectStart
    // console.log('redirectTime', redirectTime);
    // const dns = timing.domainLookupEnd- timing.domainLookupStart
    // console.log('dns', dns);
    // const tcp = timing.connectEnd - timing.connectStart
    // console.log('tcp', tcp);
    // const http = timing.responseEnd - timing.responseStart
    // console.log('http', http);
    // const parseDOM = timing.domComplete - timing.domInteractive
    // console.log('parseDOM', parseDOM);
    // const domReady = timing.domContentLoadedEventEnd - timing.navigationStart
    // console.log('domReady', domReady);
    
    const navigationStart = timing.navigationStart
    
    
    

    const getEntries = window.performance.getEntries()
    console.log('采用getEntry', getEntries)
    let navigation = {}
    let resource = {}
    // getEntries.forEach(item => {
    //   if(item.entryType === 'navigation') {
    //     console.log('navigation---', item)
    //   } else if(item.entryType === 'resource') {
    //     console.log('resource--', item)
    //   }
    // })
    // console.log('getEntry', window.performance.getEntries())
    // 不一定能获取到fcp
    const firstContentfulPaint = window.performance.getEntriesByName("first-contentful-paint")
    console.log('firstContentfulPaint', firstContentfulPaint);
    
    const paint = performance.getEntriesByType('paint')
    console.log('paint', paint);
    
    console.log('Date.now',  Date.now());
    console.log('per-now', performance.now());
    
    
    const navigationEntries = performance.getEntriesByType('navigation');
    console.log('navigationEntries', navigationEntries);
    
    if (navigationEntries.length > 0) {
      const navigationTiming = navigationEntries[0];
      console.log('navigationTiming', navigationTiming);
      const {domContentLoadedEventStart, redirectStart} = navigationTiming
      const fcp = domContentLoadedEventStart - redirectStart
      console.log('2222222222-fcp', fcp);
      
      
      // 提取性能指标，如 navigationTiming.redirectTime、navigationTiming.connectTime 等
    }
    // const fcp = window.performance.getEntriesByName("first-contentful-paint")[0].startTime - navigationStart
    
  }
}

getPerformanceData()