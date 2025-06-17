import { Badge, Table, TableTbody, TableTd, TableTh, TableThead, TableTr } from '@mantine/core';

const elements = [
  { position: 6, estado: 1, email: 'maximiliano.ovejak@gmail.com', name: 'Maximiliano Ovejak' },
  { position: 7, estado: 0, email: 'maximiliano.ovejak@gmail.com', name: 'Maximiliano Ovejak' },
  { position: 39, estado: 0, email: 'maximiliano.ovejak@gmail.com', name: 'YMaximiliano Ovejak' },
  { position: 56, estado: 1, email: 'maximiliano.ovejak@gmail.com', name: 'Maximiliano Ovejak' },
  { position: 58, estado: 1, email: 'maximiliano.ovejak@gmail.com', name: 'Maximiliano Ovejak' },
];

const page = () => {

    const rows = elements.map((element,index) => (
    <TableTr key={`${element.name}-${index}`}>
      <TableTd>{element.name}</TableTd>
      <TableTd>{element.email}</TableTd>
      <TableTd>{element.position}</TableTd>
      <TableTd>
        <Badge 
          variant="gradient"
          gradient={{ from: element.estado === 1 ?'violet' : 'pink', to: element.estado === 1 ? 'cyan' : 'orange', deg: 90 }}>
          { element.estado === 1 ? 'Activo' : 'Inactivo'}
        </Badge>
      </TableTd>
    </TableTr>
  ));


    return (
      <section>
        <Table stickyHeader stickyHeaderOffset={60} highlightOnHover >
          <TableThead>
            <TableTr>
              <TableTh>Nombre</TableTh>
              <TableTh>Correo electrónico</TableTh>
              <TableTh>Posición</TableTh>
              <TableTh>Estado</TableTh>
            </TableTr>
          </TableThead>
          <TableTbody>{rows}</TableTbody>
        </Table>
      </section>
    )
}

export default page