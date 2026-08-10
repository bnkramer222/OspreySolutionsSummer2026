function login(req, res) {

    const email = req.body.email;
    const password = req.body.password;

    // check if credentials are correct -- for now we are using hard coded values
    const correct = email === "admin@gmail.com" && password === "password";
    if (correct) {
        

        res.json({
            success: true
        });

    } else {

        res.json({
            success: false
        });
    }
}