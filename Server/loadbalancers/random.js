/*
 * Random load Balancing Algorithm Implementation.
 */

function allocateServer(callback,conf,req)
{
	var len=conf.server.serverNodes.length;
	var serverPointer=0;
	if (!conf.server.serverNodes.length<=0)
	{
		
		if (serverPointer<=len)
		{
			serverPointer = Math.floor((Math.random() * len) + 0); 
			var serverId=conf.server.serverNodes[serverPointer].nodeId;
			callback(serverId,null);
		}
		else
		{
			//direct request to first server
			var serverId=conf.server.serverNodes[0].nodeId;
			callback(serverId,null);
		}	
		
	}
	else
		{
			callback(null,new Error("No Servers found to handle Requests"));
		}
	
}
exports.allocateServer = allocateServer;