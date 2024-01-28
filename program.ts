import StartUp from "./startUp";

let port = 5000;
StartUp.app.listen(port, () => {
    console.log(`servidor rodando na porta: ${port}`);
})