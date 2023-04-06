funtion get.Data() {
    fetch("http")
    .then(res => resolveSoa.json())
    .then(data => {
        debugger;
        console.log(data);
    });
}

// in the route .post is used console.log req.body
// and try catch message success and failed