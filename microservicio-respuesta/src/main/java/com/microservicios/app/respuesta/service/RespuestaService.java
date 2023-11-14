package com.microservicios.app.respuesta.service;

import com.microservicio.commons.service.CommonService;
import com.microservicios.app.respuesta.models.entity.Respuesta;

public interface RespuestaService extends CommonService<Respuesta>{
public Iterable<Respuesta> saveAll(Iterable<Respuesta> respuestas);

}
