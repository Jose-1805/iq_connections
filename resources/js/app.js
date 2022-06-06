window.myMapObject = (el, callbackFunc) => {
    if(!el) return [];
    
    if(typeof el == "object"){
        return Object.keys(el).map((key) => {
            return callbackFunc(el[key], key);
        })
    }

    let index = -1;
    return el.map((el_) => {
      index++;
      return callbackFunc(el_, index);
    })
}
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

require('./components/App');
