# tjmun-server
Business Logic and Database Layer for connecting multiple MunSessions and showing info to users


TJMun-Server needs to:
* Have a user system with authorization levels
* Browser Renderer (Web View App)
* RESTful APIs as well as SocketIO
* Manage connection from multiple Session Clients (Not many)

##TJMun API 

#Ideas
    - Crear Sesiones de Debates con {
        * Typo de Sesion (UN, OEAS, CU, etc)
        * Nombre Del Comite (General Assembly, Security Council, etc)
        * Moderadores  / Puede Cambiar (Usuarios No Nombres)
        
        * Lista de Paises de los Delegados Participando
        * Warnings/comentarios/retardos a los delegados por parte de los moderadores
        * Estados De la Sesion (Moderated Caucus, List Call, etc)
        * Ingles/Español
        * Timer Actualizado (Solo manda dato de tiempo actual y eventos)
    }
    
    - Visualizar Sesiones a tiempo Real (Eventos)
    - Sistema para asignar comentarios por parte de quien sea a los delegados y participantes
    (Abra un sistema para que usuarios con cuenta puedan hacer comentarios a los delegados 
    en un comite en especifico, estos comentarios pueden ser: visibles a publico o no, pero 
    todos los comentarios podran ser visualizados por un usuario de alto rango
    )
    - Estructura de un comentario {
        * Nombre Del Comite
        * Delegado/Moderador Al Que Se Le Hace El comentario
        * Comentario
        * Fecha En que se hizo 
        * Usuario Que ha hecho el comentario
    } (Comentarios a moderadores son siempre Privados)
    
    
    - Estructura de un usuario {
        * //ID
        * Nombre Real
        * usuario
        * Rol/Puesto
        * Nivel De Rango (Esto Generalmente se da por defecto en base a su Puesto pero va 
        a ver manera de alterar esto)
    }
    
    - Archivo de Configuracion {
        * Nivel De Rango Por Puesto
         
    }
    
    
    
    
    
###Side Notes
 - You usually would want a /data/ Folder to save all of your Database Storage inside it
 
 
 
 
 
sessions:
 - delegates
 - warnigns
 - events
 
sessions:
 - delegates:
    - warnings
 - events

