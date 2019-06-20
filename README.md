## Blueprint

Demonstrates how backbone and underscore can combine to avoid heavy DOM manipulation in large front-end apps with server-side-rendering. `Server.py` handles routing and also functions as a simple mock-API. The frontend then uses backbone and underscore (and Bootstrap) to consume API. 

This is an exercise on consuming a RESTful API via Backbone and Underscore. The aim is to let Backbone and Underscore do the heavy lifting and do minimal amounts of manual DOM manipulation. There's a mock server (hacked together in Flask) feeding read-only data to this page. It will not write operations to disk. Reloading the page should reset the data.