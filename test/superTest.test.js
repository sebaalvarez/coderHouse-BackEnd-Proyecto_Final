import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;

const requester = supertest("http://localhost:8080");

describe("Testing Proyecto Final", () => {
  // Before;
  // BeforeEach;

  /*==========================================
    =                        Testing Products Api                                =
    ==========================================*/
  describe("Testing Products Api", () => {
    // Before
    // BeforeEach

    // Test 01
    it("Crear un Producto: El API POST /api/products debe crear un nuevo producto correctamente.", async () => {
      // Given
      const prodMock = {
        title: "ACTUALIZADO",
        description: "descripcion prueba1",
        price: "243",
        thumbnail: "imagen prueba1",
        code: "cod321n91",
        stock: "12",
      };

      // Then
      const { _body, ok, statusCode } = await requester
        .post("/api/products")
        .send(prodMock);
      // const result = await requester.post("/api/products").send(prodMock);
      // console.log(result);

      // Assert that
      expect(statusCode).is.eqls(201);
      expect(_body.payload).is.ok.and.to.have.property("_id");
      // 3 diferentes formas para validar el valor de la propiedad status
      expect(_body.payload)
        .to.have.property("status")
        .and.to.be.deep.equal(true);
      expect(_body.payload).to.have.property("status", true);
      expect(_body.payload).to.have.property("status").and.to.be.true;
    });

    // Test 02
    it("Crear un Producto sin Código: El API POST /api/products debe retornar un estado HTTP 400 con error", async () => {
      // Given
      const prodMock = {
        title: "ACTUALIZADO",
        description: "descripcion prueba1",
        price: "243",
        thumbnail: "imagen prueba1",
        // code: "cod321n8",
        stock: "12",
      };

      // Then
      const { _body, ok, statusCode } = await requester
        .post("/api/products")
        .send(prodMock);
      // const result = await requester.post("/api/products").send(prodMock);
      // console.log(result);

      // Assert that
      expect(statusCode).is.eqls(400);
      expect(_body).is.ok.and.to.have.property("error");
      expect(_body).to.have.property("status");
    });
  });

  /*=============================================
    =                 Testing login and session with Cookies               =
    =============================================*/
  describe("Testing login and session with Cookies:", () => {
    before(function () {
      this.cookie;
      this.mockUser = {
        first_name: "Usuario Testing 2",
        last_name: "Apellido Testing 2",
        email: "test21@gmail.com",
        password: "123456",
      };
    });

    // Test 01
    it("Test Registro Usuario: Debe poder registrar correctamente un usuario", async function () {
      //Given:
      // console.log(this.mockUser);

      //Then:
      // const result = await requester
      //   .post("/api/sessions/register")
      //   .send(this.mockUser);
      // console.log(result);
      const { statusCode, ok, _body } = await requester
        .post("/api/sessions/register")
        .send(this.mockUser);
      // console.log(statusCode);
      // console.log(_body);

      // //Assert that:
      expect(statusCode).is.equal(201);
    });

    //   // Test 02
    it("Test Login Usuario: Debe poder hacer login correctamente con el usuario registrado previamente.", async function () {
      //Given:
      const mockLogin = {
        email: this.mockUser.email,
        password: this.mockUser.password,
      };

      //Then:
      const result = await requester
        .post("/api/sessions/login")
        .send(mockLogin);
      // console.log(result.headers);

      // const cookieResult = result.headers["set-cookie"][0];

      // console.log(cookieResult);

      // const { statusCode, ok, _body } = await requester
      //   .post("/api/sessions/login")
      //   .send(mockLogin);

      // console.log(result._body);

      //     //Assert that:
      expect(result.statusCode).is.equal(200);
      expect(result._body).to.be.ok;
      expect(result._body).to.have.property("access_token");

      const cookieData = result.headers["set-cookie"][0].split("=");
      this.cookie = {
        name: cookieData[0],
        value: cookieData[1],
      };
      expect(this.cookie.name).to.be.ok.and.eql("connect.sid");
      expect(this.cookie.value).to.be.ok;
    });
  });
});
