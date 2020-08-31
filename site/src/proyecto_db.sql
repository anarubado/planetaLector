CREATE SCHEMA proyecto_db;

USE proyecto_db;

CREATE TABLE users(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100),
    email VARCHAR(100),
    image VARCHAR(255),
    password TEXT,
    admin TINYINT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
    deletedAt DATETIME
);

CREATE TABLE products(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    description TEXT,
    price MEDIUMINT,
    stock SMALLINT,
    isbn VARCHAR(100),
    numberPages SMALLINT,
    image VARCHAR(255),
    categoryId INT UNSIGNED,
    subcategoryId INT UNSIGNED,
    authorId INT UNSIGNED,
    editorialId INT UNSIGNED,
    coverTypeId INT UNSIGNED,
    formatTypeId INT UNSIGNED,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
    deletedAt DATETIME
);

-- status: 0 => estado pendiente de compra
-- status: 1 => estado cerrado de compra
-- orderId => numero de 'ticket', numero de compra.
-- Es null hasta que compremos el producto. Cuando éste comprado el status será 1 y orderId recibe un numero
-- El numero orderId sale de la tabla orders.

CREATE TABLE orderItems(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    userId INT UNSIGNED,
    productId INT UNSIGNED,
    productName VARCHAR(255),
    productAuthor VARCHAR(100),
    productEditorial VARCHAR(100),
    productQuantity SMALLINT,
    productPrice MEDIUMINT,
    productImage VARCHAR(255),
    productIsbn VARCHAR(255),
    subTotal INT,
    status TINYINT,
    orderId INT UNSIGNED,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
    deletedAt DATETIME
);

CREATE TABLE orders(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    number INT UNSIGNED,
    total MEDIUMINT UNSIGNED,
    userId INT UNSIGNED,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
    deletedAt DATETIME
);

CREATE TABLE categories(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
    deletedAt DATETIME
);

CREATE TABLE subcategories(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(100),
    categoryId INT UNSIGNED,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
    deletedAt DATETIME
);
    
CREATE TABLE authors(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    lastName VARCHAR(100),
    bioAuthor TEXT,
    image VARCHAR(255),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
    deletedAt DATETIME
);

CREATE TABLE editorials(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
    deletedAt DATETIME
);

CREATE TABLE coverTypes(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(100),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
    deletedAt DATETIME
);

CREATE TABLE formatTypes(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(100),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
    deletedAt DATETIME
);

-- FOREIGN KEYS

ALTER TABLE products
ADD FOREIGN KEY (categoryId) REFERENCES categories(id),
ADD FOREIGN KEY (subcategoryId) REFERENCES subcategories(id),
ADD FOREIGN KEY (authorId) REFERENCES authors(id),
ADD FOREIGN KEY (editorialId) REFERENCES editorials(id),
ADD FOREIGN KEY (coverTypeId) REFERENCES coverTypes(id),
ADD FOREIGN KEY (formatTypeId) REFERENCES formatTypes(id);

ALTER TABLE subcategories
ADD FOREIGN KEY (categoryId) REFERENCES categories(id);

ALTER TABLE orderItems
ADD FOREIGN KEY (userId) REFERENCES users(id),
ADD FOREIGN KEY (productId) REFERENCES products(id),
ADD FOREIGN KEY (orderId) REFERENCES orders(id);

ALTER TABLE orders
ADD FOREIGN KEY (userId) REFERENCES users(id);

insert into Categories (id,title) values (1, "LITERATURA");
insert into Categories (id,title) values (2, "DIVULGACION CIENTIFICA");
insert into Categories (id,title) values (3, "HISTORIA");
insert into Categories (id,title) values (4, "TECNOLOGIA");
insert into Categories (id,title) values (5, "CIENCIAS DE LA SALUD");
insert into Categories (id,title) values (6, "RELIGION");
insert into Categories (id,title) values (7, "DEPORTES");
insert into Categories (id,title) values (8, "EDUCACION FINANCIERA");
insert into Categories (id,title) values (9, "AUTOAYUDA");

insert into CoverTypes (id,type) values (1, "BLANDA");
insert into CoverTypes (id,type) values (2, "DURA");

insert into formatTypes (id,type) values (1, "DIGITAL");
insert into formatTypes (id,type) values (2, "FISICO");


insert into Editorials (id,name) values (1, "PLAZA & JANES");
insert into Editorials (id,name) values (2, "DE BOLSILLO");
insert into Editorials (id,name) values (3, "ALFAGUARA");
insert into Editorials (id,name) values (4, "TUSQUETS EDITORES S.A");
insert into Editorials (id,name) values (5, "SEIX BARRAL");
insert into Editorials (id,name) values (6, "ALMADRABA");
insert into Editorials (id,name) values (7, "LONGSELLER");

insert into subcategories (id,title,categoryId) values (1, "CLÁSICOS",1);
insert into subcategories (id,title,categoryId) values (2, "NOVELAS",1);
insert into subcategories (id,title,categoryId) values (3, "FANTASÍA",1);
insert into subcategories (id,title,categoryId) values (4, "CIENCIA FICCIÓN",1);
insert into subcategories (id,title,categoryId) values (5, "MISTERIO Y SUSPENSO",1);
insert into subcategories (id,title,categoryId) values (6, "TERROR",1);
insert into subcategories (id,title,categoryId) values (7, "NO FICCIÓN",1);

insert into Authors (id,name,lastName,bioAuthor) values (1, "STEPHEN", "KING", "Stephen King; es autor de más de cincuenta libros; todos best sellers internacionales. Sus títulos más recientes son El visitante; Bellas durmientes (con su hijo Owen King); El bazar de los malos sueños; la trilogía Bill Hodges (Mr. Mercedes; Quien pierde paga y Fin de guardia); Doctor Sueño... Su novela 22/11/63 (convertida en serie de televisión) fue elegida por The New York Times Book Review como una de las diez mejores novelas de 2011 y por Los Angeles Times como la mejor novela de intriga del año. Sus libros de la serie La Torre Oscura e It fueron adaptados al cine. Le han sido concedidos los premios 2018 PEN America Literary Service Award; 2014 National Medal of Arts y 2003 National Book Foundation Medal for Distinguished Contribution to American Letters. Vive en Bangor; Maine; con su esposa Tabitha King; también novelista. Para más información; visita la web del autor: www.stephenking.com También puedes seguir a Stephen King en Facebook y Twitter: Stephen King @StephenKing Y conoce todas las novedades del autor en lengua castellana en: Todo Stephen King @todostephenking");

insert into Authors (id,name,lastName,bioAuthor) values (2, "CLAUDIA", "PINEIRO", "Claudia Piñeiro nació en el Gran Buenos Aires en 1960. Es escritora; dramaturga; guionista de TV y colaboradora de distintos medios gráficos. Ha publicado las novelas Las viudas de los jueves; que recibió el Premio Clarín de Novela 2005; Tuya (Alfaguara; 2005); Elena sabe; Premio LiBeraturpreis 2010 (Alfaguara; 2007); Las grietas de Jara; Premio Sor Juana Inés de la Cruz 2010 (Alfaguara; 2009); Betibú (Alfaguara; 2011); Un comunista en calzoncillos (Alfaguara; 2013); Una suerte pequeña (Alfaguara; 2015); Las maldiciones (Alfaguara; 2017) y el libro de cuentos Quién no (2018); además de relatos para niños y obras de teatro. Por su obra literaria; teatral y periodística; ha obtenido diversos premios nacionales e internacionales; como el Premio Pepe Carvalho del Festival Barcelona Negra y el XII Premio Rosalía de Castro del PEN (Club de Poetas; Ensayistas y Narradores de Galicia); que distingue anualmente la trayectoria literaria de cuatro autores relevantes en lengua portuguesa; castellana; catalana y vasca. Varias de sus novelas han sido llevadas al cine. Es una de las escritoras argentinas más traducidas a otros idiomas; lo que hace que sus libros sean leídos y disfrutados por miles de lectores en todo el mundo.");

insert into Authors (id,name,lastName,bioAuthor) values (3, "EDUARDO", "SACHERI", "Eduardo Sacheri nació en Buenos Aires en 1967. Es profesor y licenciado en Historia; guionista y escritor. Toda su obra está publicada en Alfaguara: los libros de relatos Esperándolo a Tito; Te conozco; Mendizábal; Lo raro empezó después; Un viejo que se pone de pie; Los dueños del mundo y La vida que pensamos; las novelas La pregunta de sus ojos; Aráoz y la verdad; Papeles en el viento; Ser feliz era esto y La noche de la Usina (Premio Alfaguara de novela 2016); y las antologías Las llaves del reino y El fútbol; de la mano; que reúnen sus artículos publicados en la revista El Gráfico (2011-2015). La pregunta de sus ojos fue llevada al cine por Juan José Campanella como El secreto de sus ojos; film distinguido con el Oscar a la mejor película extranjera (2010) y cuyo guión estuvo a cargo de Sacheri y Campanella. Aráoz y la verdad fue adaptada al teatro. Papeles en el viento fue filmada por Juan Taratuto y La noche de la Usina tiene su versión cinematográfica con el título La odisea de los giles; dirigida por Sebastián Borensztein. Su obra ha sido traducida a más de veinte idiomas. Colabora en diarios y revistas nacionales e internacionales.");

insert into Authors (id,name,lastName,bioAuthor) values (4, "FERNANDO","ARAMBURU", "Fernando Aramburu (San Sebastián, 1959) está ya considerado como uno de los narradores más destacados en lengua española. Es autor de los libros de cuentos Los peces de la amargura (2006, XI Premio Mario Vargas Llosa NH, IV Premio Dulce Chacón y Premio Real Academia Española 2008) y El vigilante del fiordo (2011), así como de novelas como Fuegos con limón (1996), Los ojos vacíos (2000, Premio Euskadi), que junto con Bami sin sombra (2005) y La gran Marivián (2013) conforman la «Trilogía de Antíbula», El trompetista del Utopía (2003), Viaje con Clara por Alemania (2010), Años lentos (2012, VII Premio Tusquets Editores de Novela y Premio de los Libreros de Madrid) y Ávidas pretensiones (Premio Biblioteca Breve 2014). Pero ha sido su novela Patria, de apabullante éxito entre los lectores y merecedora de unánime reconocimiento ya internacional (Premio Nacional de Narrativa, Premio de la Crítica, Premio Euskadi, Premio Francisco Umbral, Premio Dulce Chacón, Premio Arcebispo Juan de San Clemente, Premio Strega Europeo, Premio Lampedusa, Premio Atenas…), la que lo ha situado como un escritor llamado a marcar época. Suyos son también los recientes Autorretrato sin mí, tal vez su libro más personal y hermoso, y Vetas profundas, un volumen de celebración de la poesía.");

insert into Authors (id,name,lastName,bioAuthor) values (5, "ALMUNEDA", "GRANDES", "Almudena Grandes (Madrid, 1960) se dio a conocer en 1989 con Las edades de Lulú, XI Premio La Sonrisa Vertical. Desde entonces el aplauso de los lectores y de la crítica no ha dejado de acompañarla. Sus novelas Te llamaré Viernes, Malena es un nombre de tango, Atlas de geografía humana, Los aires difíciles, Castillos de cartón, El corazón helado y Los besos en el pan, junto con los volúmenes de cuentos Modelos de mujer y Estaciones de paso, la han convertido en uno de los nombres más consolidados y de mayor proyección internacional de la literatura española contemporánea. Varias de sus obras han sido llevadas al cine, y han merecido, entre otros, el Premio de la Fundación Lara, el Premio de los Libreros de Madrid y el de los de Sevilla, el Rapallo Carige y el Prix Méditerranée. En 2010 publicó Inés y la alegría (Premio de la Crítica de Madrid, el Premio Iberoamericano de Novela Elena Poniatowska y el Premio Sor Juana Inés de la Cruz), primer título de la serie Episodios de una Guerra Interminable, a la que siguieron El lector de Julio Verne (2012), Las tres bodas de Manolita (2014) y Los pacientes del doctor García (2017; Premio Nacional de Narrativa).");

insert into Authors (id,name,lastName,bioAuthor) values (6, "ELVIRA", "LINDO", "Elvira Lindo nació en Cádiz en 1962. Realizó estudios de periodismo en la Universidad Complutense de Madrid y en 1981 empezó a trabajar en Radio Nacional de España, donde hizo labores de guionista, locutora, comentarista y presentadora, tareas que repitió en la Cadena SER y en la televisión. Es en los guiones radiofónicos donde surgió el personaje de Manolito Gafotas, que desde la publicación del primer libro de la serie, en 1994, goza de un éxito enorme. Su obra incluye las novelas El otro barrio (1998, 2019), Algo más inesperado que la muerte (2003), adaptada a los escenarios, Lo que me queda por vivir (2010), Lugares que no quiero compartir con nadie (2011), Noches sin dormir (2015) y A corazón abierto (2020), la obra de teatro La ley de la selva (1996), sus crónicas de El País en Tinto de verano (2001), Otro verano contigo (2002) y Don de gentes (2011), y 30 maneras de quitarse el sombrero (2018). En 1998 fue galardonada con el Premio Nacional de Literatura Infantil y Juvenil, y en 2005 recibió el Premio Biblioteca Breve por la novela Una palabra tuya, llevada al cine con gran éxito por Ángeles González-Sinde. También ha escrito numerosos guiones cinematográficos, como La vida inesperada (2014) o La primera noche de mi vida (1998), que cosechó varios premios en festivales nacionales e internacionales. Ganadora del Premio Internacional de Periodismo 2015 y del Premio Atlántida del Gremio de Editores de Cataluña en 2009, colabora habitualmente en el diario El País y en el programa «La Ventana» de Cadena Ser.");

insert into Authors (id,name,lastName,bioAuthor) values (7,"MIGUEL", "DE CERVANTES", "Novelista, poeta y dramaturgo español. Se cree que nació el 29 de septiembre de 1547 en Alcalá de Henares y murió el 22 de abril de 1616 en Madrid, pero fue enterrado el 23 de abril y popularmente se conoce esta fecha como la de su muerte.");

insert into Authors (id,name,lastName,bioAuthor) values (8,"HOMERO", "", "Homero fue un poeta de la Antigua Grecia que nació y vivió en el siglo VIII a.C. Es autor de dos de las principales obras de la antigüedad: Los poemas épicos La Ilíada y La Odisea. ... La vida de Homero es una mezcla de leyenda y realidad.");
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

insert into Products (id,title,description,price,stock,isbn,numberPages,image,categoryId,subcategoryId,authorId,editorialId,coverTypeId,formatTypeId) values (	1, "LA SANGRE MANDA", "Cuatro novelas cortas de Stephen King sobre las fuerzas ocultas que nos acechan. En esta colección única nos ofrece un impactante noir paranormal; protagonizado por la carismática Holly Gibney; y tres relatos más que ponen de manifiesto el incomparable talento; la imaginación sin par y la dive (...)",1299,130,	9789506445386,464,"LA-SANGRE-MANDA.jpg",1,2,1,1,1,2);
insert into Products (id,title,description,price,stock,isbn,numberPages,image,categoryId,subcategoryId,authorId,editorialId,coverTypeId,formatTypeId) values (	2, "LA MILLA VERDE", "Stephen King ambienta su novela en una penitenciaría de presos condenados a muerte, una antesala del infierno de la que se sirve para trazar una radiografía del horror en estado puro. Octubre de 1932, penitenciaría de Cold Mountain. Los condenados a muerte aguardan el momento de ser conducidos a la silla eléctrica. Los crímenes abominables que han cometido les convierten en carnaza de un sistema legal que se alimenta de un círculo de locura, muerte y venganza. La milla verde representa un hito gran en la aclamada trayectoriadel maestro indiscutible de la narrativa de terror contemporánea.",1100,200,9788490326152,280,"LA-MILLA-VERDE.jpg",1,6,1,2,1,2);
insert into Products (id,title,description,price,stock,isbn,numberPages,image,categoryId,subcategoryId,authorId,editorialId,coverTypeId,formatTypeId) values (	3, "LOS DOS DESPUES DE MEDIANOCHE", "Miedo multiplicado por dos es igual a terror absoluto. Atado a un asiento de avión en un vuelo más allá del infierno. Atrapado en las profundidades de la peor pesadilla de un escritor. Simplemente, estás en las manos de Stephen King: te dejará tieso con un extraordinario doblete de novelas, garantizando el paro cardíaco a... las dos después de medianoche. La crítica ha dicho...Cualquiera de las dos bastaría a un escritor normal para dar por buena la producción del año. Pero estas novelas cortas son más que una simple y buena cosecha: son de esas historias que no te permiten apartar la vista ni impedir que se te abrase la imaginación.Playboy",999,100,9789875665385,320,"LOS-DOS-DESPUES-DE-MEDIANOCHE.jpg",1,6,1,2,1,2);
insert into Products (id,title,description,price,stock,isbn,numberPages,image,categoryId,subcategoryId,authorId,editorialId,coverTypeId,formatTypeId) values (	4, "HISTORIAS FANTASTICAS", "El maestro del terror vuelve a ofrecer unas páginas electrizantes en este tomo que reúne 13 relatos escalofriantes escritos en su mejor estilo. Siguiendo la tradición de Poe, Stevenson y Lovecraft, King nos abre la puerta de acceso a un mundo de horrores inimaginables. Stephen King ha fundido aquí imágenes de terrores ancestrales con la iconografía de la actual sociedad norteamericana. Los relatos incluidos en este libro, originales y trepidantes, han cautivado a millones de lectores en todo el mundo.",1200,250,9788401354021,426,"HISTORIAS-FANTASTICAS.jpg",1,3,1,2,1,2);
insert into Products (id,title,description,price,stock,isbn,numberPages,image,categoryId,subcategoryId,authorId,editorialId,coverTypeId,formatTypeId) values (	5, "CATEDRALES", "Una adolescente aparece quemada y descuartizada en un descampado. Treinta años después; el crimen sigue sin aclararse y su familia y entorno se han desmoronado. (...)",900,350,9789877386875,336,"CATEDRALES.jpg",1,2,2,3,1,2);
insert into Products (id,title,description,price,stock,isbn,numberPages,image,categoryId,subcategoryId,authorId,editorialId,coverTypeId,formatTypeId) values (	6, "LO MUCHO QUE TE AME", "Se puede amar a dos personas a la vez? Una historia de amor diferente que transcurre en los años 50 en el barrio porteño de Palermo. (...)",900,120,9789877386417,384,"LO-MUCHO-QUE-TE-AME.jpg",1,2,3,3,1,2);
insert into Products (id,title,description,price,stock,isbn,numberPages,image,categoryId,subcategoryId,authorId,editorialId,coverTypeId,formatTypeId) values (	7, "PATRIA", "El día en que ETA anuncia el abandono de las armas, Bittori se dirige al cementerio para contarle a la tumba de su marido el Txato, asesinado por los terroristas, que ha decidido volver a la casa donde vivieron. ¿Podrá convivir con quienes la acosaron antes y después del atentado que trastocó su vida y la de su familia? ¿Podrá saber quién fue el encapuchado que un día lluvioso mató a su marido, cuando volvía de su empresa de transportes? Por más que llegue a escondidas, la presencia de Bittori alterará la falsa tranquilidad del pueblo, sobre todo de su vecina Miren, amiga íntima en otro tiempo, y madre de Joxe Mari, un terrorista encarcelado y sospechoso de los peores temores de Bittori. ¿Qué pasó entre esas dos mujeres? ¿Qué ha envenenado la vida de sus hijos y sus maridos tan unidos en el pasado? Con sus desgarros disimulados y sus convicciones inquebrantables, con sus heridas y sus valentías, la historia incandescente de sus vidas antes y después del cráter que fue la muerte del Txato, nos habla de la imposibilidad de olvidar y de la necesidad de perdón en una comunidad rota por el fanatismo político.",1350,231,9789876704137,648,"PATRIA.jpg",1,2,4,4,1,2);
insert into Products (id,title,description,price,stock,isbn,numberPages,image,categoryId,subcategoryId,authorId,editorialId,coverTypeId,formatTypeId) values (	8, "VETAS PROFUNDAS", "Tras un paseo poco placentero por la bulliciosa y atestada calle de una de nuestras ciudades, Fernando Aramburu busca consolación en el jardín botánico. En ese entorno más amable y lejos ya del ajetreo, se anima a abrir el libro de poesía que lleva en la mochila, y siente que su lectura lo sosiega y lo transporta a un lugar seguro, lejos del mundanal ruido. De esta forma es como Aramburu entiende la poesía, como algo parecido a un refugio",1100,121,9789876705707,240,"VETAS-PROFUNDAS.jpg",1,2,4,4,1,2);
insert into Products (id,title,description,price,stock,isbn,numberPages,image,categoryId,subcategoryId,authorId,editorialId,coverTypeId,formatTypeId) values (	9, "LA MADRE DE FRANKESTEIN", "En 1954, el joven psiquiatra Germán Velázquez vuelve a España para trabajar en el manicomio de mujeres de Ciempozuelos, al sur de Madrid. Tras salir al exilio en 1939, ha vivido quince años en Suiza, acogido por la familia del doctor Goldstein. En Ciempozuelos, Germán se reencuentra con Aurora Rodríguez Carballeira, una parricida paranoica, inteligentísima, que le fascinó a los trece años, y conoce a una auxiliar de enfermería, María Castejón, a la que doña Aurora enseñó a leer y a escribir cuando era una niña. Germán, atraído por María, no entiende el rechazo de ésta, y sospecha que su vida esconde muchos secretos. El lector descubrirá su origen modesto como nieta del jardinero del manicomio, sus años de criada en Madrid, su desdichada historia de amor, a la par que los motivos por los que Germán ha regresado a España. Almas gemelas que quieren huir de sus respectivos pasados, Germán y María quieren darse una oportunidad, pero viven en un país humillado, donde los pecados se convierten en delitos, y el puritanismo, la moral oficial, encubre todo tipo de abusos y atropellos.",1300,35,9788490667804,560,"LA-MADRE-DE-FRANKESTEIN.jpg",1,2,5,4,1,2);
insert into Products (id,title,description,price,stock,isbn,numberPages,image,categoryId,subcategoryId,authorId,editorialId,coverTypeId,formatTypeId) values (	10, "A CORAZON ABIERTO", "Partiendo de un episodio ocurrido en Madrid en 1939, la narradora de esta historia cuenta la apasionada y tormentosa relación de sus padres, y cómo la personalidad desmedida de él y el corazón débil de ella marcaron el pulso de la vida de toda la familia.A corazón abierto es una novela que recorre nuestro país a lo largo de un siglo de grandes cambios y encierra un homenaje a una generación, la de quienes permanecieron en España en la inmediata posguerra, aquellos que, sin queja ni lamento, se concentraron en sobrevivir.",960,131,9788432236365,384,"A-CORAZON-ABIERTO.jpg",1,2,6,5,1,2);
insert into Products (id,title,description,price,stock,isbn,numberPages,image,categoryId,subcategoryId,authorId,editorialId,coverTypeId,formatTypeId) values (	11, "DON QUIJOTE DE LA MANCHA", "Don Quijote de la Mancha es incesante el cruce entre lo real y lo ficticio, una semilla de la literatura en castellano que se escribiría en América: Sancho, pues vos queréis que se os crea lo que habéis visto en el cielo, yo quiero que vos me creáis a mí lo que vi en la cueva de Montesinos. O como escribió uno de sus escritores admiradores, Jorge Luis Borges: El hidalgo fue un sueño de Cervantes / y don Quijote un sueño del hidalgo",790,35,108415171803,1345,"DON-QUIJOTE-DE-LA-MANCHA.jpg",1,1,7,6,1,2);
insert into Products (id,title,description,price,stock,isbn,numberPages,image,categoryId,subcategoryId,authorId,editorialId,coverTypeId,formatTypeId) values (	12, "LA ILIADA", "En su Poética, Aristóteles señaló que una buena epopeya representa una acción única, no un conjunto de acontecimientos. Tal vez sea ese el acierto de La Ilíada: la obra atribuida al poeta griego Homero no cuenta la Guerra de Troya entera, sino su año décimo, el último; no se dispersa en los sentimientos de todos sus personajes sino que se concentra en las emociones del héroe, Aquiles. Las pérdidas de los griegos, los giros del destino, las intervenciones de los dioses y la caída de Troya se narran mediante los actos que generan la ira, el orgullo, el impulso de desagravio, el amor y la compasión de Aquiles.",2380,20,9789700773308,380,"LA-ILIADA.jpg",1,1,8,7,1,2);







