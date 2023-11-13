package com.microservicio.app.formulario.repositorio;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.microservicio.app.formulario.conexion.Conexion;
import com.microservicio.app.formulario.model.Formulario;

@Repository
public class FormularioDaoImpl implements FormularioDao {
	
	@Override
	public List<Formulario> listAll() {
		List<Formulario> lista = new ArrayList<>();
		 
		Conexion conexion = new Conexion();
		Connection conn;
		PreparedStatement ps;
		ResultSet rs;		
		        
        String sql = "select * from formulario";        
        
        try {
            conn = conexion.Conectar();
            ps = conn.prepareStatement(sql);
            rs = ps.executeQuery();

            while (rs.next()) {
            	Formulario form = new Formulario();
            	form.setFormId(rs.getLong("form_id"));
            	form.setFormDescripcion(rs.getString("form_descripcion"));
            	form.setFormTipo(rs.getString("form_tipo"));
                lista.add(form);
            }
        } catch (SQLException ex) {
            System.out.println("Error al listar " + ex.getMessage());
            return null;
        } finally {
            conexion.CerrarConexion();
        }
        return lista;		
    }
	
	@Override
	public List<Formulario> findByTipo(String tipo) {
		List<Formulario> lista = new ArrayList<>();
		 
		Conexion conexion = new Conexion();
		Connection conn;
		PreparedStatement ps;
		ResultSet rs;		
		        
        String sql = "select * from formulario where form_tipo = ?";        
        
        try {
            conn = conexion.Conectar();
            ps = conn.prepareStatement(sql);
            ps.setString(1, tipo);
            rs = ps.executeQuery();

            while (rs.next()) {
            	Formulario form = new Formulario();
            	form.setFormId(rs.getLong("form_id"));
            	form.setFormDescripcion(rs.getString("form_descripcion"));
            	form.setFormTipo(rs.getString("form_tipo"));
                lista.add(form);
            }
        } catch (SQLException ex) {
            System.out.println("Error al buscar por tipo " + ex.getMessage());
            return null;
        } finally {
            conexion.CerrarConexion();
        }
        return lista;
	}
}

