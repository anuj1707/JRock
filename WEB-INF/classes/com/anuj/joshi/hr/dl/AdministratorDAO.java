package com.anuj.joshi.hr.dl;
import java.sql.*;
public class AdministratorDAO
{
public AdministratorDTO getByUsername (String username) throws DAOException
{
try
{
Connection connection=DAOConnection.getConnection();
PreparedStatement preparedStatement;
preparedStatement=connection.prepareStatement("select * from administrator where username=?");
preparedStatement.setString(1,username);
ResultSet resultSet;
resultSet=preparedStatement.executeQuery();
if(resultSet.next()==false)
{
resultSet.close();
preparedStatement.close();
connection.close();
System.out.println("Invalid username : "+username);
}
AdministratorDTO administratorDTO=new AdministratorDTO();
administratorDTO.setUsername(username);
administratorDTO.setPassword(resultSet.getString("password").trim());//trim krna bhulgaya thha
resultSet.close();
preparedStatement.close();
connection.close();
return administratorDTO;
}catch(SQLException sqlException)
{
throw new DAOException(sqlException.getMessage());
}
}
}