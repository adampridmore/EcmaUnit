@echo off

echo.
echo ---------------------------------------------
echo Run unit tests
mongo --quiet --nodb EcmaUnitTests_MongoDB.js
IF NOT ERRORLEVEL 0 (
	goto error:	
) 
echo ---------------------------------------------

echo.
echo ---------------------------------------------
echo Run example, to smoke test it in node.
node EcmaUnitTests_ExampleNode.js
IF NOT ERRORLEVEL 0 (
	goto error:	
) 
echo ---------------------------------------------

echo.
echo ---------------------------------------------
echo Run example, to smoke test it in mongo.
mongo --quiet --nodb EcmaUnitTests_ExampleMongoDB.js
IF NOT ERRORLEVEL 0 (
	goto error:	
) 
echo ---------------------------------------------

echo.
echo --------
echo  SUCESS 
echo --------
goto eof:

:error
echo.
echo ************
echo ** FAILED **
echo ************



:eof
