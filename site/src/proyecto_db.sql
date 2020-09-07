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
    discount TINYINT,
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

CREATE TABLE subCategories(
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
ADD FOREIGN KEY (subcategoryId) REFERENCES subCategories(id),
ADD FOREIGN KEY (authorId) REFERENCES authors(id),
ADD FOREIGN KEY (editorialId) REFERENCES editorials(id),
ADD FOREIGN KEY (coverTypeId) REFERENCES coverTypes(id),
ADD FOREIGN KEY (formatTypeId) REFERENCES formatTypes(id);

ALTER TABLE subCategories
ADD FOREIGN KEY (categoryId) REFERENCES categories(id);

ALTER TABLE orderItems
ADD FOREIGN KEY (userId) REFERENCES users(id),
ADD FOREIGN KEY (productId) REFERENCES products(id),
ADD FOREIGN KEY (orderId) REFERENCES orders(id);

ALTER TABLE orders
ADD FOREIGN KEY (userId) REFERENCES users(id);

INSERT INTO categories (id, title) VALUES 
(1, "Literatura"),
(2, "Divulgación científica"),
(3, "Historia"),
(4, "Tecnología"),
(5, "Ciencias de la Salud"),
(6, "Religión"),
(7, "Deportes"),
(8, "Educación Financiera"),
(9, "Autoayuda");

INSERT INTO coverTypes (id, type) VALUES 
(1, "Tapa blanda"),
(2, "Tapa dura"),
(3, null);

INSERT INTO formatTypes (id, type) VALUES 
(1, "Analógico"),
(2, "Digital");

INSERT INTO editorials (id,name) VALUES 
(1, "Plaza & Janes"),
(2, "De Bolsillo"),
(3, "Alfaguara"),
(4, "Tusquets Editores S.A."),
(5, "Seix Barrral"),
(6, "Alamadraba"),
(7, "Longseller"),
(8, "Gerald Duckworth and Company Ltd"),
(9, "Losada"),
(10, "Alianza"),
(11, "Edhasa"),
(12, "Lumen"),
(13, "Gadir");

INSERT INTO subCategories (id, title, categoryId) VALUES
 (1, "Clásicos", 1),
 (2, "Novelas Contemporáneas", 1),
 (3, "Fantasía", 1),
 (4, "Ciencia Ficción", 1),
 (5, "Misterio ", 1),
 (6, "Terror", 1),
 (7, "No Ficción", 1);
 

INSERT INTO authors (id, name, lastName, bioAuthor, image) VALUES 
(1, "Stephen", "King", "Stephen King; es autor de más de cincuenta libros; todos best sellers internacionales. Sus títulos más recientes son El visitante; Bellas durmientes (con su hijo Owen King); El bazar de los malos sueños; la trilogía Bill Hodges (Mr. Mercedes; Quien pierde paga y Fin de guardia); Doctor Sueño... Su novela 22/11/63 (convertida en serie de televisión) fue elegida por The New York Times Book Review como una de las diez mejores novelas de 2011 y por Los Angeles Times como la mejor novela de intriga del año. Sus libros de la serie La Torre Oscura e It fueron adaptados al cine. Le han sido concedidos los premios 2018 PEN America Literary Service Award; 2014 National Medal of Arts y 2003 National Book Foundation Medal for Distinguished Contribution to American Letters. Vive en Bangor; Maine; con su esposa Tabitha King; también novelista. Para más información; visita la web del autor: www.stephenking.com También puedes seguir a Stephen King en Facebook y Twitter: Stephen King @StephenKing Y conoce todas las novedades del autor en lengua castellana en: Todo Stephen King @todostephenking", 'STEPHEN-KING.jpg'),
(2, "Claudia", "Pineiro", "Claudia Piñeiro nació en el Gran Buenos Aires en 1960. Es escritora; dramaturga; guionista de TV y colaboradora de distintos medios gráficos. Ha publicado las novelas Las viudas de los jueves; que recibió el Premio Clarín de Novela 2005; Tuya (Alfaguara; 2005); Elena sabe; Premio LiBeraturpreis 2010 (Alfaguara; 2007); Las grietas de Jara; Premio Sor Juana Inés de la Cruz 2010 (Alfaguara; 2009); Betibú (Alfaguara; 2011); Un comunista en calzoncillos (Alfaguara; 2013); Una suerte pequeña (Alfaguara; 2015); Las maldiciones (Alfaguara; 2017) y el libro de cuentos Quién no (2018); además de relatos para niños y obras de teatro. Por su obra literaria; teatral y periodística; ha obtenido diversos premios nacionales e internacionales; como el Premio Pepe Carvalho del Festival Barcelona Negra y el XII Premio Rosalía de Castro del PEN (Club de Poetas; Ensayistas y Narradores de Galicia); que distingue anualmente la trayectoria literaria de cuatro autores relevantes en lengua portuguesa; castellana; catalana y vasca. Varias de sus novelas han sido llevadas al cine. Es una de las escritoras argentinas más traducidas a otros idiomas; lo que hace que sus libros sean leídos y disfrutados por miles de lectores en todo el mundo.", 'CLAUDIA-PINEIRO.jpg'),
(3, "Eduardo", "Sacheri", "Eduardo Sacheri nació en Buenos Aires en 1967. Es profesor y licenciado en Historia; guionista y escritor. Toda su obra está publicada en Alfaguara: los libros de relatos Esperándolo a Tito; Te conozco; Mendizábal; Lo raro empezó después; Un viejo que se pone de pie; Los dueños del mundo y La vida que pensamos; las novelas La pregunta de sus ojos; Aráoz y la verdad; Papeles en el viento; Ser feliz era esto y La noche de la Usina (Premio Alfaguara de novela 2016); y las antologías Las llaves del reino y El fútbol; de la mano; que reúnen sus artículos publicados en la revista El Gráfico (2011-2015). La pregunta de sus ojos fue llevada al cine por Juan José Campanella como El secreto de sus ojos; film distinguido con el Oscar a la mejor película extranjera (2010) y cuyo guión estuvo a cargo de Sacheri y Campanella. Aráoz y la verdad fue adaptada al teatro. Papeles en el viento fue filmada por Juan Taratuto y La noche de la Usina tiene su versión cinematográfica con el título La odisea de los giles; dirigida por Sebastián Borensztein. Su obra ha sido traducida a más de veinte idiomas. Colabora en diarios y revistas nacionales e internacionales.", 'EDUARDO-SACHERI.jpg'),
(4, "Fernando","Aramburu", "Fernando Aramburu (San Sebastián, 1959) está ya considerado como uno de los narradores más destacados en lengua española. Es autor de los libros de cuentos Los peces de la amargura (2006, XI Premio Mario Vargas Llosa NH, IV Premio Dulce Chacón y Premio Real Academia Española 2008) y El vigilante del fiordo (2011), así como de novelas como Fuegos con limón (1996), Los ojos vacíos (2000, Premio Euskadi), que junto con Bami sin sombra (2005) y La gran Marivián (2013) conforman la «Trilogía de Antíbula», El trompetista del Utopía (2003), Viaje con Clara por Alemania (2010), Años lentos (2012, VII Premio Tusquets Editores de Novela y Premio de los Libreros de Madrid) y Ávidas pretensiones (Premio Biblioteca Breve 2014). Pero ha sido su novela Patria, de apabullante éxito entre los lectores y merecedora de unánime reconocimiento ya internacional (Premio Nacional de Narrativa, Premio de la Crítica, Premio Euskadi, Premio Francisco Umbral, Premio Dulce Chacón, Premio Arcebispo Juan de San Clemente, Premio Strega Europeo, Premio Lampedusa, Premio Atenas…), la que lo ha situado como un escritor llamado a marcar época. Suyos son también los recientes Autorretrato sin mí, tal vez su libro más personal y hermoso, y Vetas profundas, un volumen de celebración de la poesía.", 'FERNANDO-ARAMBURU.jpg'),
(5, "Almuneda", "Grandes", "Almudena Grandes (Madrid, 1960) se dio a conocer en 1989 con Las edades de Lulú, XI Premio La Sonrisa Vertical. Desde entonces el aplauso de los lectores y de la crítica no ha dejado de acompañarla. Sus novelas Te llamaré Viernes, Malena es un nombre de tango, Atlas de geografía humana, Los aires difíciles, Castillos de cartón, El corazón helado y Los besos en el pan, junto con los volúmenes de cuentos Modelos de mujer y Estaciones de paso, la han convertido en uno de los nombres más consolidados y de mayor proyección internacional de la literatura española contemporánea. Varias de sus obras han sido llevadas al cine, y han merecido, entre otros, el Premio de la Fundación Lara, el Premio de los Libreros de Madrid y el de los de Sevilla, el Rapallo Carige y el Prix Méditerranée. En 2010 publicó Inés y la alegría (Premio de la Crítica de Madrid, el Premio Iberoamericano de Novela Elena Poniatowska y el Premio Sor Juana Inés de la Cruz), primer título de la serie Episodios de una Guerra Interminable, a la que siguieron El lector de Julio Verne (2012), Las tres bodas de Manolita (2014) y Los pacientes del doctor García (2017; Premio Nacional de Narrativa).", 'ALMUENDA-GRANDES.jpg'),
(6, "Elvira", "Lindo", "Elvira Lindo nació en Cádiz en 1962. Realizó estudios de periodismo en la Universidad Complutense de Madrid y en 1981 empezó a trabajar en Radio Nacional de España, donde hizo labores de guionista, locutora, comentarista y presentadora, tareas que repitió en la Cadena SER y en la televisión. Es en los guiones radiofónicos donde surgió el personaje de Manolito Gafotas, que desde la publicación del primer libro de la serie, en 1994, goza de un éxito enorme. Su obra incluye las novelas El otro barrio (1998, 2019), Algo más inesperado que la muerte (2003), adaptada a los escenarios, Lo que me queda por vivir (2010), Lugares que no quiero compartir con nadie (2011), Noches sin dormir (2015) y A corazón abierto (2020), la obra de teatro La ley de la selva (1996), sus crónicas de El País en Tinto de verano (2001), Otro verano contigo (2002) y Don de gentes (2011), y 30 maneras de quitarse el sombrero (2018). En 1998 fue galardonada con el Premio Nacional de Literatura Infantil y Juvenil, y en 2005 recibió el Premio Biblioteca Breve por la novela Una palabra tuya, llevada al cine con gran éxito por Ángeles González-Sinde. También ha escrito numerosos guiones cinematográficos, como La vida inesperada (2014) o La primera noche de mi vida (1998), que cosechó varios premios en festivales nacionales e internacionales. Ganadora del Premio Internacional de Periodismo 2015 y del Premio Atlántida del Gremio de Editores de Cataluña en 2009, colabora habitualmente en el diario El País y en el programa «La Ventana» de Cadena Ser.", 'ELVIRA-LINDO.jpg'),
(7,"Miguel", "De Cervantes", "Novelista, poeta y dramaturgo español. Se cree que nació el 29 de septiembre de 1547 en Alcalá de Henares y murió el 22 de abril de 1616 en Madrid, pero fue enterrado el 23 de abril y popularmente se conoce esta fecha como la de su muerte.", 'MIGUEL-DE-CERVANTES.jpg'),
(8,"Homero", "", "Homero fue un poeta de la Antigua Grecia que nació y vivió en el siglo VIII a.C. Es autor de dos de las principales obras de la antigüedad: Los poemas épicos La Ilíada y La Odisea. ... La vida de Homero es una mezcla de leyenda y realidad.", 'HOMERO.jpg'),
(9,"Virginia","Wolf", "Adeline Virginia Stephen más conocida como Virginia Woolf fue una escritora británica, autora de novelas, cuentos, obras teatrales y demás obras literarias; considerada una de las más destacadas figuras del vanguardista modernismo anglosajón del siglo XX y del feminismo internacional.", "VIRGINIA-WOLF.jpg"),
(10, "J.K.Rowling","","J.K. ROWLING J K (Joanne Kathleen) Rowling es autora de los siete libros de la famosa saga de Harry Potter. Amada por lectores de todo el mundo, la serie ha vendido más de 500 millones de ejemplares, se ha traducido a ochenta idiomas y ha inspirado ocho películas de enorme éxito de taquilla. Ha escrito asimismo tres volúmenes complementarios con fines benéficos: Quidditch a través de los tiempos, Animales fantásticos y dónde encontrarlos (en beneficio de Comic Relief y Lumos), y Los cuentos de Beedle el Bardo (en beneficio de Lumos), así como el guión inspirado en Animales fantásticos y dónde encontrarlos, la primera de una serie de cinco películas que escribirá la autora. También colaboró en una obra, Harry Potter y el legado maldito, Partes Uno y Dos, que se estrenó en el West End de Londres en el verano de 2016. En 2012 creó la plataforma digital Pottermore, donde sus fans pueden disfrutar de noticias, reportajes y artículos, así como de contenido original escrito por J. K. Rowling. Asimismo, ha escrito la novela para adultos Una vacante imprevista, y, con el seudónimo Robert Galbraith, la serie de novelas policíacas protagonizadas por Cormoran Strike. Ha sido galardonada con numerosos premios, entre ellos la Orden del Imperio Británico por su contribución a la literatura infantil y la Orden de los Compañeros de Honor, la Orden de la Legión de Honor de Francia y el Premio Hans Christian Andersen", "JK-ROWLING.jpg");
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


INSERT INTO products (id, title, description, price, stock, isbn, numberPages, image, discount, categoryId, subcategoryId, authorId, editorialId, coverTypeId, formatTypeId) VALUES 
(1, "La Sangre Manda", "Cuatro novelas cortas de Stephen King sobre las fuerzas ocultas que nos acechan. En esta colección única nos ofrece un impactante noir paranormal; protagonizado por la carismática Holly Gibney; y tres relatos más que ponen de manifiesto el incomparable talento; la imaginación sin par y la dive (...)",1299,130,	9789506445386,464,"LA-SANGRE-MANDA.jpg", 10,1,2,1,1,1,2),
(2, "La Milla Verde", "Stephen King ambienta su novela en una penitenciaría de presos condenados a muerte, una antesala del infierno de la que se sirve para trazar una radiografía del horror en estado puro. Octubre de 1932, penitenciaría de Cold Mountain. Los condenados a muerte aguardan el momento de ser conducidos a la silla eléctrica. Los crímenes abominables que han cometido les convierten en carnaza de un sistema legal que se alimenta de un círculo de locura, muerte y venganza. La milla verde representa un hito gran en la aclamada trayectoriadel maestro indiscutible de la narrativa de terror contemporánea.",1100,200,9788490326152,280,"LA-MILLA-VERDE.jpg", 10,1,6,1,2,1,2),
(3, "Los dos después de medianoche", "Miedo multiplicado por dos es igual a terror absoluto. Atado a un asiento de avión en un vuelo más allá del infierno. Atrapado en las profundidades de la peor pesadilla de un escritor. Simplemente, estás en las manos de Stephen King: te dejará tieso con un extraordinario doblete de novelas, garantizando el paro cardíaco a... las dos después de medianoche. La crítica ha dicho...Cualquiera de las dos bastaría a un escritor normal para dar por buena la producción del año. Pero estas novelas cortas son más que una simple y buena cosecha: son de esas historias que no te permiten apartar la vista ni impedir que se te abrase la imaginación.Playboy",999,100,9789875665385,320,"LOS-DOS-DESPUES-DE-MEDIANOCHE.jpg", 20, 1,6,1,2,1,2),
(4, "Historias Fantásticas", "El maestro del terror vuelve a ofrecer unas páginas electrizantes en este tomo que reúne 13 relatos escalofriantes escritos en su mejor estilo. Siguiendo la tradición de Poe, Stevenson y Lovecraft, King nos abre la puerta de acceso a un mundo de horrores inimaginables. Stephen King ha fundido aquí imágenes de terrores ancestrales con la iconografía de la actual sociedad norteamericana. Los relatos incluidos en este libro, originales y trepidantes, han cautivado a millones de lectores en todo el mundo.",1200,250,9788401354021,426,"HISTORIAS-FANTASTICAS.jpg", 30, 1,3,1,2,1,2),
(5, "Catedrales", "Una adolescente aparece quemada y descuartizada en un descampado. Treinta años después; el crimen sigue sin aclararse y su familia y entorno se han desmoronado. (...)",900,350,9789877386875,336,"CATEDRALES.jpg", 10,1,2,2,3,1,2),
(6, "Lo mucho que te amé", "Se puede amar a dos personas a la vez? Una historia de amor diferente que transcurre en los años 50 en el barrio porteño de Palermo. (...)",900,120,9789877386417,384,"LO-MUCHO-QUE-TE-AME.jpg", null, 1,2,3,3,1,2),
(7, "Patria", "El día en que ETA anuncia el abandono de las armas, Bittori se dirige al cementerio para contarle a la tumba de su marido el Txato, asesinado por los terroristas, que ha decidido volver a la casa donde vivieron. ¿Podrá convivir con quienes la acosaron antes y después del atentado que trastocó su vida y la de su familia? ¿Podrá saber quién fue el encapuchado que un día lluvioso mató a su marido, cuando volvía de su empresa de transportes? Por más que llegue a escondidas, la presencia de Bittori alterará la falsa tranquilidad del pueblo, sobre todo de su vecina Miren, amiga íntima en otro tiempo, y madre de Joxe Mari, un terrorista encarcelado y sospechoso de los peores temores de Bittori. ¿Qué pasó entre esas dos mujeres? ¿Qué ha envenenado la vida de sus hijos y sus maridos tan unidos en el pasado? Con sus desgarros disimulados y sus convicciones inquebrantables, con sus heridas y sus valentías, la historia incandescente de sus vidas antes y después del cráter que fue la muerte del Txato, nos habla de la imposibilidad de olvidar y de la necesidad de perdón en una comunidad rota por el fanatismo político.",1350,231,9789876704137,648,"PATRIA.jpg", 10, 1,2,4,4,1,2),
(8, "Vetas Profundas", "Tras un paseo poco placentero por la bulliciosa y atestada calle de una de nuestras ciudades, Fernando Aramburu busca consolación en el jardín botánico. En ese entorno más amable y lejos ya del ajetreo, se anima a abrir el libro de poesía que lleva en la mochila, y siente que su lectura lo sosiega y lo transporta a un lugar seguro, lejos del mundanal ruido. De esta forma es como Aramburu entiende la poesía, como algo parecido a un refugio",1100,121,9789876705707,240,"VETAS-PROFUNDAS.jpg", null,1,2,4,4,1,2),
(9, "La madre de Frankestein", "En 1954, el joven psiquiatra Germán Velázquez vuelve a España para trabajar en el manicomio de mujeres de Ciempozuelos, al sur de Madrid. Tras salir al exilio en 1939, ha vivido quince años en Suiza, acogido por la familia del doctor Goldstein. En Ciempozuelos, Germán se reencuentra con Aurora Rodríguez Carballeira, una parricida paranoica, inteligentísima, que le fascinó a los trece años, y conoce a una auxiliar de enfermería, María Castejón, a la que doña Aurora enseñó a leer y a escribir cuando era una niña. Germán, atraído por María, no entiende el rechazo de ésta, y sospecha que su vida esconde muchos secretos. El lector descubrirá su origen modesto como nieta del jardinero del manicomio, sus años de criada en Madrid, su desdichada historia de amor, a la par que los motivos por los que Germán ha regresado a España. Almas gemelas que quieren huir de sus respectivos pasados, Germán y María quieren darse una oportunidad, pero viven en un país humillado, donde los pecados se convierten en delitos, y el puritanismo, la moral oficial, encubre todo tipo de abusos y atropellos.",1300,35,9788490667804,560,"LA-MADRE-DE-FRANKESTEIN.jpg", null,1,2,5,4,1,2),
(10, "A corazón abierto", "Partiendo de un episodio ocurrido en Madrid en 1939, la narradora de esta historia cuenta la apasionada y tormentosa relación de sus padres, y cómo la personalidad desmedida de él y el corazón débil de ella marcaron el pulso de la vida de toda la familia.A corazón abierto es una novela que recorre nuestro país a lo largo de un siglo de grandes cambios y encierra un homenaje a una generación, la de quienes permanecieron en España en la inmediata posguerra, aquellos que, sin queja ni lamento, se concentraron en sobrevivir.",960,131,9788432236365,384,"A-CORAZON-ABIERTO.jpg", null,1,2,6,5,1,2),
(11, "Don Quijote de la Mancha", "Don Quijote de la Mancha es incesante el cruce entre lo real y lo ficticio, una semilla de la literatura en castellano que se escribiría en América: Sancho, pues vos queréis que se os crea lo que habéis visto en el cielo, yo quiero que vos me creáis a mí lo que vi en la cueva de Montesinos. O como escribió uno de sus escritores admiradores, Jorge Luis Borges: El hidalgo fue un sueño de Cervantes / y don Quijote un sueño del hidalgo",790,35,108415171803,1345,"DON-QUIJOTE-DE-LA-MANCHA.jpg", 10,1,1,7,6,1,2),
(12, "La Iliada", "En su Poética, Aristóteles señaló que una buena epopeya representa una acción única, no un conjunto de acontecimientos. Tal vez sea ese el acierto de La Ilíada: la obra atribuida al poeta griego Homero no cuenta la Guerra de Troya entera, sino su año décimo, el último; no se dispersa en los sentimientos de todos sus personajes sino que se concentra en las emociones del héroe, Aquiles. Las pérdidas de los griegos, los giros del destino, las intervenciones de los dioses y la caída de Troya se narran mediante los actos que generan la ira, el orgullo, el impulso de desagravio, el amor y la compasión de Aquiles.",2380,20,9789700773308,380,"LA-ILIADA.jpg", 20,1,1,8,7,1,2),
(13, "Fin de viaje", "Es la primera novela publicada por Virginia Woolf en 1915 por la editorial de su medio hermano, Gerald Duckworth and Company Ltd; publicado en Estados Unidos en 1920 por Doran. Es una de las más ingeniosas sátiras sociales de Woolf.", 2361,5,8421711687,328,"FIN-DE-VIAJE.jpg",null,1,2,9,8,1,1),
(14, "Noche y día", "Es la segunda novela de Virginia Woolf, publicada el 20 de octubre de 1919. Ambientada en el Londres eduardiano, Noche y día contrasta las vidas cotidianas de dos amigas, Katharine Hilbery y Mary Datchet. La novela examina las relaciones entre el amor, el matrimonio, la felicidad y el éxito.", 990,1,8401410657,442,"NOCHE-Y-DIA.jpg",null,1,2,9,9,1,1),
(15, "El cuarto de Jacob", "Es la tercera novela de Virginia Woolf, publicada el 26 de octubre de 1922.", 900,5,9789500399715,442,"EL-CUARTO-DE-JACOB.jpg",10,1,2,9,10,1,1),
(16, "La señora Dalloway", "Es la cuarta novela de Virginia Woolf, publicada el 14 de mayo de 1925. Detalla un día en la vida de Clarissa Dalloway, en la Inglaterra posterior a la Primera Guerra Mundial.", 2351,5,9788491812999,240,"LA-SEÑORA-DALLOWAY.jpg",null,1,2,9,11,1,1),
(17, "Al faro", "Es la quinta novela de Virginia Woolf, publicada el 5 de mayo de 1927. Esta novela es un hito del alto modernismo. El texto, centrado en la familia Ramsay y sus visitas a la isla de Skye en Escocia entre 1910 y 1920, manipula hábilmente el tiempo y la exploración psicológica.", 430,5,9789876831901,256,"AL-FARO.jpg",null,1,2,9,12,2,1),
(18, "Orlando", " Es la sexta novela de Virginia Woolf, publicada el 11 de octubre de 1928. La editorial que se encargó de su publicación, Hogarth Press, pertenecía al matrimonio Woolf. Se trata de una obra en parte biográfica, basada en la vida de la novia de Woolf Vita Sackville-West. Se considera que es una de las novelas más accesibles de Woolf, y por ello la de mayor éxito de la autora en vida. Ha influido mucho estilísticamente, y se la considera importante en la literatura en general, y en la escritura femenina y los estudios de género en particular.", 900,5,9789500372299,229,"ORLANDO.jpg",null,1,2,9,13,2,1),
(19, "Las olas", "Es la séptima novela de Virginia Woolf, publicada el 8 de octubre de 1931. Es la novela más experimental de Woolf. Está formada por soliloquios de los seis personajes del libro: Bernard, Susan, Rhoda, Neville, Jinny y Louis. También es importante Percival, el séptimo personaje, aunque los lectores nunca le oyen hablar por sí mismo. Los monólogos que abarcan las vidas de los personajes están interrumpidos por nueve breves interludios en tercera persona detallando una escena costera en varias etapas en un día desde el amanecer hasta la puesta de sol.", 750,5,9876282441,320,"LAS-OLAS.jpg",null,1,2,9,11,2,1),
(20, "Los años", "Es la octava novela de Virginia Woolf, publicada en 1937. Es la última que publicó en vida. Traza la historia de la gentil familia Pargiter desde los años 1880 hasta la actualidad de mediados de los años treinta.", 999,1,8426417337,496,"LOS-AÑOS.jpg",20,1,2,9,12,1,1),
(21, "Entre actos", "Es la novena y última novela de Virginia Woolf, publicada en 1941, poco después del suicidio de la autora. Es un libro cargado con significados y alusiones ocultos. Describe el montaje, la representación y el público de una obra en un festival, de ahí el título, en un pequeño pueblo inglés justo antes de que estalle la Segunda Guerra Mundial. Gran parte de la obra anticipa la guerra, con alusiones veladas a conectarse con el continente por vía aérea, golondrinas representando a los aviones y hundiéndose en la oscuridad.", 649,5,8426416721,208,"ENTRE-ACTOS.jpg",15,1,2,9,12,1,1),
(22, "La viuda y el loro", "Es un cuento para niños de la autora inglesa Virginia Woolf escrito a principios de la década de 1920 para el periódico familiar (The Charleston Bulletin) que editaban sus sobrinos Julian y Quentin Bell.", 950,5,8494044117,64,"LA-VIUDA-Y-EL-LORO.jpg",10,1,4,9,13,1,1),
(23, "Un cuarto propio", "Un cuarto propio es el lúcido testimonio crítico del rol de la mujer en la sociedad, y un verdadero clásico del siglo XX.  “Cuando leemos sobre una bruja que fue sumergida en el agua, sobre una mujer poseída por los demonios, sobre una mujer sabia que vende hierbas, pienso que estamos sobre la pista de una novelista perdida, una poeta silenciada, una Jane Austen enmudecida y sin gloria, una Emily Brontë que desperdició su inteligencia en los páramos o marchaba desquiciada por los caminos, enloquecida por la tortura a la que la sometía su talento.", 650,5,9871772505,144,"UN-CUARTO-PROPIO.jpg",null,3,2,9,11,1,1),
(24, "Harry Potter y la piedra filosofal", "Harry Potter nunca ha oído hablar de Hogwarts hasta que empiezan a caer cartas en el felpudo del número 4 de Privet Drive. Llevan la dirección escrita con tinta verde en un sobre de pergamino amarillento con un sello de lacre púrpura, y sus horripilantes tíos se apresuran a confiscarlas. Más tarde, el día que Harry cumple once años, Rubeus Hagrid, un hombre gigantesco cuyos ojos brillan como escarabajos negros, irrumpe con una noticia extraordinaria: Harry Potter es un mago, y le han concedido una plaza en el Colegio Hogwarts de Magia y Hechicería. ¡Está a punto de comenzar una aventura increíble!",2380,20,9789700773308,380,"HARRY-POTTER-Y-LA-PIEDRA-FILOSOFAL.jpg", 20,1,1,10,7,1,2),
(25, "Harry Potter y la camara secreta", "El verano de Harry Potter ha incluido el peor cumpleaños de su vida, las funestas advertencias de un elfo doméstico llamado Dobby y el rescate de casa de los Dursley protagonizado por su amigo Ron Weasley al volante de un coche mágico volador. De vuelta en el Colegio Hogwarts de Magia y Hechicería, donde va a empezar su segundo curso, Harry oye unos extraños susurros que resuenan por los pasillos vacíos. Y entonces empiezan los ataques y varios alumnos aparecen petrificados... Por lo visto, las siniestras predicciones de Dobby se están cumpliendo....",1380,20,9789700773308,380,"HARRY-POTTER-Y-LA-CAMARA-SECRETA.jpg", null,1,1,10,7,1,2),
(26, "Harry Potter y el prisonero de azkaban", "Cuando el autobús noctámbulo irrumpe en una calle oscura y frena con fuertes chirridos delante de Harry, comienza para él un nuevo curso en Hogwarts, lleno de acontecimientos extraordinarios. Sirius Black, asesino y seguidor de lord Voldemort, se ha fugado, y dicen que va en busca de Harry. En su primera clase de Adivinación, la profesora Trelawney ve un augurio de muerte en las hojas de té de la taza de Harry... Pero quizá lo más aterrador sean los dementores que patrullan por los jardines del colegio, capaces de sorberte el alma con su beso..",2380,20,9789700773308,380,"HARRY-POTTER-Y-EL-PRISIONERO-DE-AZKABAN.jpg", 10,1,1,10,7,1,2),
(27, "Harry Potter y el caliz del fuego", "Se va a celebrar en Hogwarts el Torneo de los Tres Magos. Sólo los alumnos mayores de diecisiete años pueden participar en esta competición, pero, aun así, Harry sueña con ganarla. En Halloween, cuando el cáliz de fuego elige a los campeones, Harry se lleva una sorpresa al ver que su nombre es uno de los escogidos por el cáliz mágico. Durante el torneo deberá enfrentarse a desafíos mortales, dragones y magos tenebrosos, pero con la ayuda de Ron y Hermione, sus mejores amigos, ¡quizá logre salir con vida!",2480,20,9789700773308,380,"HARRY-POTTER-Y-EL-CALIZ-DEL-FUEGO.jpg", 25,1,1,10,7,1,2),
(28, "Harry Potter y la orden del fenix", "Son malos tiempos para Hogwarts. Tras el ataque de los dementores a su primo Dudley, Harry Potter comprende que Voldemort no se detendrá ante nada para encontrarlo. Muchos niegan que el Señor Tenebroso haya regresado, pero Harry no está solo: una orden secreta se reúne en Grimmauld Place para luchar contra las fuerzas oscuras. Harry debe permitir que el profesor Snape le enseñe a protegerse de las brutales incursiones de Voldemort en su mente. Pero éstas son cada vez más potentes, y a Harry se le está agotando el tiempo...",2580,20,9789700773308,380,"HARRY-POTTER-Y-LA-ORDEN-DEL-FENIX.jpg", null,1,1,10,7,1,2),
(29, "Harry potter y el misterio del principe", "Harry Potter y el misterio del principe es la sexta novela de la ya clasica serie fantastica de la autora britanica J.K. Rowling. Con dieciseis años cumplidos, Harry inicia el sexto curso en Hogwarts en medio de terribles acontecimientos que asolan Inglaterra. Elegido capitan del equipo de quidditch, los ensayos, los examenes y las chicas ocupan todo su tiempo, pero la tranquilidad dura poco. A pesar de los ferreos controles de seguridad que protegen la escuela, dos alumnos son brutalmente atacados. ",2680,20,9789700773308,380,"HARRY-POTTER-Y-EL-MISTERIO-DEL-PRINCIPE.jpg", null,1,1,10,7,1,2),
(30, "Harry Potter y las reliquias de la muerte", "Cuando se monta en el sidecar de la moto de Hagrid y se eleva en el cielo, dejando Privet Drive por última vez, Harry Potter sabe que lord Voldemort y sus mortífagos se hallan cerca. El encantamiento protector que había mantenido a salvo a Harry se ha roto, pero el no puede seguir escondiendose. El Señor Tenebroso se dedica a aterrorizar a todos los seres queridos de Harry, y, para detenerlo, este habrá de encontrar y destruir los horrocruxes que quedan. La batalla definitiva debe comenzar: Harry tendrá que alzarse y enfrentarse a su enemigo...",2340,20,9789700773308,380,"HARRY-POTTER-Y-LAS-RELIQUIAS-DE-LA-MUERTE.jpg", null,1,1,10,7,1,2),
(31, "Harry Potter y el legado maldito", "Ser Harry Potter nunca ha sido tarea fácil, menos aún desde que se ha convertido en un ocupadísimo empleado del Ministerio de Magia, un hombre casado y padre de tres hijos. Mientras Harry planta cara a un pasado que se resiste a quedar atrás, su hijo menor, Albus, ha de luchar contra el peso de una herencia familiar de la que él nunca ha querido saber nada. Cuando el destino conecte el pasado con el presente, padre e hijo deberán afrontar una verdad muy incómoda: a veces, la oscuridad surge de los lugares más insospechados.",2320,20,9789700773308,380,"HARRY-POTTER-Y-EL-LEGADO-MALDITO.jpg", 10,1,1,10,7,1,2),
(32, "Animales Fantasticos", "El explorador y magizoólogo Newt Scamander llega a Nueva York con la intención de permanecer unos pocos días. Pero cuando pierde su maleta y algunos de sus animales fantásticos se escapan de ella, una serie de acontecimientos extraordinarios se desatan, poniendo en vilo a la gran ciudad...",2780,20,9789700773308,380,"ANIMALES-FANTASTICOS.jpg", null,1,1,10,7,1,2),
(33, "Los cuentos de Beedle el bardo", "Los cuentos de Beedle el Bardo contiene cinco cuentos de hadas muy diferentes, cada uno con su propio carácter mágico, que deleitarán al lector con su humor y la emoción del peligro de muerte.",2330,20,9789700773308,380,"LOS-CUENTOS-DE-BEEDLE-EL-BARDO.jpg", null,1,1,10,7,1,2);







