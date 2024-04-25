import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exceptions/AllExceptionFilter';
import { writeFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Lucas - Movie Catalog API Documentation')
    .setDescription(
      `
    Este é um sistema de autenticação JWT com uma CRUD de um catálogo de filmes. Todos os endpoints desta CRUD só podem ser consumidos por um usuário autenticado.

    Ferramentas utilizadas:
    - TypeScript
    - Nest.js
    - TypeORM
    - Swagger
    - Docker
    - Redis
    - PostgreSQL

    A arquitetura é composta por uma aplicação que fornece uma API RESTful em JSON, utilizando Redis como cache.

    OBS: Todas as informações tratadas em cada endpoint são validadas.

    Back-end:
    A engenharia de qualidade é saber utilizar a ferramenta certa para o trabalho certo e seguir aprendendo constantemente sobre ela. Levando isso em consideração, a experiência com cada uma das ferramentas utilizadas é mencionada no README.

    Deploy:
    O deploy foi realizado no local mais confortável (exemplo: Amazon EC2, Heroku, Netlify, Google AppEngine, etc).

    não consegui fazer tudo que eu queria, esse sistema foi feito em 24h
  `,
    )
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token', // This is the name of the field that will be added to the Swagger UI
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  // Write Swagger document to JSON file
  writeFileSync('./swagger-spec.json', JSON.stringify(document));

  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(3000);
}
bootstrap();
