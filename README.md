# Data Dashboard

> El presente documento detalla todo el proceso de elaboración del proyecto Data Dashboard. Se divide en 3 etapas: Planificación , el proceso de diseño y la implementación del producto. A continuación se explica cómo fue cada etapa. 

## Planificación 
La fase de planeación, está compuesta por 3 **Sprint Plan**, los cuales se llevaron a cabo durante tres semanas. Durante el primer sprint plan, se desarrolló un **Product Backlog**, donde se identificaron las tareas épicas y la definición de terminado. Esta organización fue por squads. Las tareas a desarrollar durante cada épica se definió en parejas. Utilizando la metodología ágil de *Pair Programming*, utilizamos *Trello* como principal herramienta de organización.

![sprint planning](src/images/sprint1.jpeg)
![trello planning](src/images/trello1.jpg)

Durante el segundo sprint plan, se desarrolló un nuevo Product Backlog, en el cual se definió nuevas tareas épicas. La finalidad fue implementar una función que muestre el prpogreso de estudiantes en ejercicios.

![sprint planning](src/images/sprint2.jpeg)

Durante el tercer sprint plan, se definió nuevas tareas épicas en el Product Backlog. Sin embargo, nos encontramos confusas al implementar Javascript. Por ello, nos propusimos leer y practicar los temas del LMS, ver videos relacionados, así como compartir lo entendido con nuestra partner. Pese a nuestros esfuerzos, solo se logró un pequeño avance respecto a la manipulación del DOM. También logramos hacer peticiones asíncronas con Fetch. El desarrollo de las funciones y la creación de eventos con el DOM, la colocamos como "Blocked", ya que nos estancamos en estos puntos, sin lograr nuevos avances.

![sprint planning](src/images/sprint3.jpg)


Durante esta fase, se respondieron algunas preguntas para poder definir el producto.

### Principales usuarios del producto

Se identificó a los Training Manager (TM) de Laboratoria como principales usuarios, además de coaches, instructores, y personas en general que necesiten conocer el avance de un determinado cohort.

### Objetivos del usuario en relación al producto

+	Identificar cómo va cada estudiante en su proceso de aprendizaje. 
+	Visualizar estadísticamente el grado de completitud del Learning Management System (LMS) y en base a eso tener un mejor entendimiento del progreso de cada estudiante.

### Datos más relevantes de la interfaz 

La necesidad principal del usuario es conocer el avance de cada estudiante, por lo tanto los datos más relevantes que desea ver en la interfaz son las estadísticas de:
+	Los ejercicios 
+	Las lecturas 
+	Los  quizzes

Esta información le permitirá al usuario saber en qué medida las estudiantes están completando los contenidos de aprendizaje, además de conocer los resultados de las evaluaciones (quizzes). De esta forma, podrá analizar el nivel de progreso de cada persona, así como tomar decisiones más acertadas y rápidas. Se llegó a estas conclusiones por las entrevistas generadas a los principales usuarios.

###  Principal momento de revisar el producto

Se determinó que los datos son revisados por los usuarios al finalizar cada proyecto.

### Solución del producto a sus problemas

Este producto resuelve sus problemas ya que actualmente solo disponen de archivos Excel para ver el progreso de las alumnas. Con la creación de un dashboard, el usuario tendrá la información mejor organizada, mediante una interfaz que le permitirá tener una  visualización clara, ordenada y específica, además de gráficos fáciles de interpretar. Por otro lado, podrá ordenar el nivel de completitud de forma ascendente o descendente.También le permite optimizar el tiempo ya que se hace uso de las nuevas tecnologías para agilizar un proceso que podría tomar muchas horas si se hace manualmente. Un ejemplo de esto, sería buscar información precisa utilizando los filtros de búsqueda.

## El proceso de diseño

El proceso de diseño comprende 5 fases, las cuales permiten crear un producto centrado en el usuario, y que permita  satisfacer sus necesidades. Para ello, empezamos entendiendo al usuario en la primera fase y lo seguimos involucrando a lo largo del proceso para ir validando nuestras propuestas.

#### 1) DESCUBRIMIENTO E INVESTIGACIÓN

![etapa1](src/images/e1.jpg)

En esta etapa identificamos quiénes serían nuestros usuarios, cuáles son sus necesidades y objetivos. Además, buscamos información sobre cómo diseñar un producto, y tableros de visualización como referencia para construir el que mejor se adecuaba a nuestros usuarios. 
Sin embargo, la parte más importante fue investigar y entender la labor que desempeñan los training mánager en Laboratoria, y el problema existente. Para esto, empleamos las siguientes técnicas: 
-Entrevistas con usuarios
-Búsquedas en la web

#### 2) SÍNTESIS Y DEFINICIÓN

![etapa2](src/images/e2.jpg)

En esta fase usamos los datos coleccionados en la fase de descubrimiento e investigación buscando tendencias valiosas para el desarrollo del producto, y entendemos los deseos y necesidades de nuestros usuarios.

Para comprender las necesidades de los Training Manager elaboramos un flujograma con la información más relevenate que ellos desean ver en un data dashboard.

![flujograma](src/images/flujograma.jpeg)

#### 3) IDEACIÓN

![etapa3](src/images/e3.jpg)

En esta fase imaginamos como sería nuestro producto ideal. Para ello, cada integrante elaboró un sketch, y luego lo explicó a su compañera. A través de feedbacks, se implementó un sketch que integraba ambas ideas. Las herramientas que se utilizaron fueron: lápiz, papel y borrador. 

Como resultado, se obtuvo el siguiente prototipo de baja fidelidad:

![sketch1](src/images/1.jpg)

![sketch2](src/images/2.JPG)

![sketch3](src/images/3.jpg)

![sketch4](src/images/4.jpg)

![sketch5](src/images/5.JPG)

![sketch6](src/images/6.jpg)

![sketch7](src/images/7.JPG)

Luego se presentó el Sketch a algunos usuarios con la finalidad de poder realizar mejoras.

### Entrevista a Alejandra:

Hola, Ale. Cuentanos un poco de tu labor como training manager en Laboratoria.
1. ¿Cómo haces para poder estar pendiente del progreso de cada estudiante? Es decir, son muchas, debe ser un poco difícil seguirlas a todas.
2. ¿Podrías contarnos cuándo revisas esta información?
3. ¿Cual es la información que buscas más? Es decir, ¿qué información es la más relevante que consideres debes ver primero?
4. ¿Qué otros aspectos te interesa ver al evaluar el progreso?
5. ¿Qué tipo de visualización crees que te ayudaría a evaluar? (Ejemplo: gráficos, tablas, etc)
6. ¿Podias contarnos masomeos cómo utilizas la información de progreso?

De la entrevista, se llegó a las siguientes conclusiones:
- La labor de una training manager va más allá de revisar la información acerca del progreso de cada estudiante ya que también es parte     de suproceso de aprendizaje, además de esto expone estos avances a la City Director de Laboratoria. Dado esto, emplea mucho de su         tiempo extrayendo la información de una plataforma poco dinámica para luego elaborar sus informes. Además se encarga de llevar a cabo     las ceremonias, coordinar con producto y apoyar en el diseño de los productos.
- Actualmente Laboratoria no dispone con una data dashboard. La plataforma que utilizan, la considera rudimentaria ya que tiene muchas      pestañas y además presenta la data de forma poco gráfica.
- Le gustaría poder visualizar por alumna y también por cohort el avance y/o resultados por unidad de cada curso.
- Normalmente revisa el nivel de progreso al final de cada proyecto.
- Lo más importante a revisar son los ejercicios. 


#### 4) PROTOTIPADO

![etapa4](src/images/e4.jpg)

De las presentaciones del sketch, se llegó a las siguientes conclusiones:
- Un botón de registro resulta innecesario ya que no es una plataforma que cualquier persona pueda acceder.
- Tener filtros en la parte del header y en el desplegable resulta confuso. 
- Se requiere gráficas generales de completitud del cohort.


Luego de hacer mejoras en el sketch en base al feedback de la entrevista, elaboramos un prototipo que nos permita probar nuestras ideas con usuarios para saber si estamos satisfaciendo sus necesidades con nuestro producto.

En este caso, realizamos un prototipado de alta fidelidad, y como principal herramienta utilizamos Figma.

![prototipo2](src/images/login.jpg)

![prototipo3](src/images/menudesplegable.png)

![prototipo4](src/images/sedes.png)

![prototipo5](src/images/cohorts.png)

![prototipo6](src/images/global.png)

![prototipo7](src/images/alumnas.png)

![prototipo8](src/images/ordenarpor.png)

![prototipo9](src/images/poralumna.png)

#### 5) TESTEO CON USUARIOS

![etapa5](src/images/e5.jpg)

En esta etapa probaremos nuestro prototipo con usuarios para obtener su feedback.

## Implementación del producto

Para la elaboración del producto se utilizaron las siguientes herramientas: HTML 5, CSS, Javascript. Para los test, emplearemos Node JS. 