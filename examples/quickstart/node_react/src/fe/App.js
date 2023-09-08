import React from "react";
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import CardContent from '@mui/joy/CardContent';
import Stack from '@mui/joy/Stack';
import ModalDialog from '@mui/joy/ModalDialog';
import Modal from '@mui/joy/Modal';
import Add from '@mui/icons-material/Add';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';


function App() {
  const [data, setData] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    fetch("/tenants")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);


  return (
    <CssVarsProvider>
      <Stack spacing={5} margin={5} direction="row" flexWrap="wrap" useFlexGap maxWidth={800}>
        <Typography level="h1" color="primary" >Choose a tenant or create a new one</Typography>
          <Button
                variant="solid"
                size="md"
                color="primary"
                aria-label="add-tenant"
                startDecorator={<Add />}
                onClick={() => setOpen(true)}
                sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600}}
              >
                CREATE TENANT
          </Button>
        </Stack>
        <Stack spacing={5} margin={5} direction="row" flexWrap="wrap" useFlexGap>
          {!data ? "Loading..." : 
          data.map((item) => (
            <Card key={item.id}>
              <div><Typography level="title-lg">{item.name}</Typography></div>
              <AspectRatio sx={{ width: 300 }} >
                <img
                  src={`https://picsum.photos/seed/${item.name}/300/300`}
                  loading="lazy"
                  alt=""
                />
              </AspectRatio>
              <CardContent orientation="horizontal">
              <Button
              variant="solid"
              size="md"
              color="primary"
              aria-label={item.name}
              sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
              component="a"
              href={`/tenants/${item.id}/todos`}
            >
              Explore
            </Button>
              </CardContent>
            </Card>))}
  
          <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog
              aria-labelledby="basic-modal-dialog-title"
              aria-describedby="basic-modal-dialog-description"
              sx={{ maxWidth: 500 }}
            >
            <Typography id="basic-modal-dialog-title" level="h2">
              Create new tenant
            </Typography>
            <form
              onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                const tenant = event.currentTarget.elements[0].value;
                fetch('/tenants', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    name: tenant,
                  }),
                })
                  .then((resp) => resp.json())
                  .then((datum) => {
                    debugger;
                    console.log(datum);
                    data.push({name: tenant, id: datum.id});
                    setData(data);
                    setOpen(false);
                  })
                  .catch((error) => {
                    console.error(error);
                    setOpen(false);
                  });

              }}
            >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input autoFocus required />
              </FormControl>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
        </Stack>
        </CssVarsProvider>
  );
}

export default App;