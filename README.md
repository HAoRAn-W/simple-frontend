# Simple Front-end

The front end part of whr.one

Working in progress.

* React.js
* MUI
* Redux

when using http only cookies, need to configure SpringBoot to allow CORS, set react app address as origins
axios should send request with credentials and sprong boot need accept that.

state     action    reducer
cnt = 0   inc,dec   cnt + 1, cnt - 1
in React, components call action to trigger reducer