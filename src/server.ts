import fastify from "fastify";
import fastifyCors from "@fastify/cors";
const server = fastify({ logger: true });
server.register(fastifyCors, {
    origin: "*"
})
const teams = [
  { id: 1, name: "McLaren", base: "Woking, United Kingdom" },
  { id: 2, name: "Mercedes", base: "Brackley, United Kingdom" },
  { id: 3, name: "Red Bull Racing", base: "Milton Keynes, United Kingdom" },
];

const drivers = [
  { id: 1, name: "Max Verstappen", team: "Red Bull Racing" },
  { id: 2, name: "Lewis Hamilton", team: "Mercedes" },
  { id: 3, name: "Lando Norris", team: "McLaren" },
];


server.get("/teams" , async(request, response) => {
  response.type("application/json").code(200);
  return {teams}
})

server.get("/drivers" , async(request, response) => {
  response.type("application/json").code(200);
  return  {drivers}

})
interface Driver {
  id: string;
}

server.get<{Params:Driver}>("/drivers/:id" , async(request, response) => {
const id = parseInt(request.params.id);
const driver = drivers.find((d) => d.id === id);

if(!driver){
  response.code(404);
  return {error: "Driver not found"};
}else{
  response.code(200);
  return driver;
}
})





server.listen({port:3333}, ()=>{
    console.log("server init💨")
})