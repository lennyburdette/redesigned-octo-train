fn subgraph_service(service, subgraph) {
  service.map_request(|request| {
    print(request);
  });
  service.map_response(|response| {
    print(response);
  });
}
