import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { storeItems, changeItems } from '../store';
import { useState, useEffect } from 'react';

const boxStyle = {
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '60%',
  bgcolor: 'rgb(40, 40, 40)',
  boxShadow: 24,
  p: 4,
};

const CustomAddInput = (props) => {
  return (
    <input
      style={{
        width: props.width,
        height: props.height,
        border: 'none',
      }}
      className='custom-input'
      type={props.type}
      required={props.required}
      onChange={props.function}
      placeholder={props.placeHolder}
    />
  );
};

const SelectAutoWidth = (props) => {
  const handleChangeDelete = (event) => {
    const temp = props.setDelete;
    temp(event.target.value);
  };

  return (
    <FormControl
      required
      fullWidth
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
      }}
    >
      <InputLabel id='demo-simple-select-label'>ID</InputLabel>
      <Select
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value={props.value}
        label='item'
        onChange={handleChangeDelete}
      >
        {props.items.map((item) => {
          return (
            <MenuItem key={item.id} value={item.id}>
              {item.id}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

const RefreshButton = (props) => {
  return (
    <Button
      sx={{
        height: '50px',
        position: 'absolute',
        top: '70px',
        right: '20%',
      }}
      variant={'contained'}
      className='admin-panel-refresh'
      onClick={() => {
        fetch('https://geolab-project.herokuapp.com/items')
          .then((response) => response.json())
          .then((data) => props.changeItems(data))
          .catch((err) => console.error(err));
        console.log('refreshed');
      }}
    >
      Refresh
    </Button>
  );
};

const FetchButton = (props) => {
  return (
    <Button
      sx={{ height: props.height, width: props.width }}
      color={props.color}
      variant='contained'
      onClick={props.function}
    >
      {props.type}
    </Button>
  );
};

const MyModal = (props) => {
  const [deleteItemId, setDeleteItemId] = useState(1);
  let addRow = [];
  const addValues = () => {
    console.log(addRow);
  };

  if (props.type == 'add') {
    return (
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={boxStyle}>
          <div className='modal-top-inputs'>
            <CustomAddInput
              width={'100%'}
              height={'45px'}
              placeHolder={'ID'}
              type={'number'}
              function={(e) => {
                addRow[0] = parseInt(e.target.value);
              }}
              required={true}
            />
            <CustomAddInput
              width={'100%'}
              height={'45px'}
              placeHolder={'Type'}
              type={'text'}
              function={(e) => {
                addRow[1] = e.target.value;
              }}
              required={true}
            />
            <CustomAddInput
              width={'100%'}
              height={'45px'}
              placeHolder={'Price'}
              type={'number'}
              function={(e) => {
                addRow[2] = parseInt(e.target.value);
              }}
              required={true}
            />
            <CustomAddInput
              width={'100%'}
              height={'45px'}
              placeHolder={'Sale Price'}
              type={'number'}
              function={(e) => {
                addRow[3] = parseInt(e.target.value);
              }}
              required={true}
            />
            <CustomAddInput
              width={'100%'}
              height={'45px'}
              placeHolder={'Gel Price'}
              type={'number'}
              function={(e) => {
                addRow[3] = parseInt(e.target.value);
              }}
              required={true}
            />
            <CustomAddInput
              width={'100%'}
              height={'45px'}
              placeHolder={'Sale Gel Price'}
              type={'number'}
              function={(e) => {
                addRow[4] = parseInt(e.target.value);
              }}
              required={true}
            />

            <CustomAddInput
              width={'100%'}
              height={'45px'}
              placeHolder={'Image URL'}
              type={'text'}
              function={(e) => {
                addRow[5] = e.target.value;
              }}
              required={true}
            />
            <CustomAddInput
              width={'100%'}
              height={'45px'}
              placeHolder={'Availability'}
              type={'text'}
              function={(e) => {
                addRow[6] = parseInt(e.target.value);
              }}
              required={true}
            />
            <CustomAddInput
              width={'100%'}
              height={'45px'}
              placeHolder={'Name'}
              type={'text'}
              function={(e) => {
                addRow[7] = e.target.value;
              }}
              required={true}
            />
          </div>
          <Button
            variant='contained'
            onClick={() => {
              addValues();
              fetch('http://localhost:3006/add', {
                method: 'POST',
                body: addRow,
              })
                .then((response) => {
                  return response.text();
                })
                .then((data) => console.log(data));
            }}
            sx={{ height: '100px' }}
          >
            Add Values
          </Button>
        </Box>
      </Modal>
    );
  } else if (props.type == 'delete') {
    return (
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          sx={boxStyle}
          style={{
            backgroundColor: 'white',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
          }}
        >
          <SelectAutoWidth
            value={deleteItemId}
            items={props.items}
            setDelete={setDeleteItemId}
          />
          <Button
            variant='contained'
            onClick={() => {
              fetch('http://localhost:3006/delete', {
                method: 'POST',
                body: deleteItemId,
              })
                .then((response) => {
                  return response.text();
                })
                .then((data) => console.log(data));
            }}
            sx={{ height: '100px' }}
          >
            Delete Item
          </Button>
        </Box>
      </Modal>
    );
  }
};

export const AdminPanel = () => {
  const [modalType, setModalType] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const items = storeItems.use();
  useEffect(() => {
    fetch('https://geolab-project.herokuapp.com/items')
      .then((response) => response.json())
      .then((data) => changeItems(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className='admin-panel'>
      <div className='admin-panel-top'>
        <h1 className='admin-panel-heading'>Admin Panel</h1>
      </div>
      <RefreshButton changeItems={changeItems} />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Item ID</TableCell>
              <TableCell align='right'>Type</TableCell>
              <TableCell align='right'>Price</TableCell>
              <TableCell align='right'>SalePrice&nbsp;</TableCell>
              <TableCell align='right'>GelPrice&nbsp;</TableCell>
              <TableCell align='right'>SaleGelPrice&nbsp;</TableCell>
              <TableCell align='right'>Image&nbsp;</TableCell>
              <TableCell align='right'>Availability&nbsp;</TableCell>
              <TableCell align='right'>Name&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow
                key={item.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align='right'>{item.id}</TableCell>
                <TableCell align='right'>{item.type}</TableCell>
                <TableCell align='right'>{item.price}</TableCell>
                <TableCell align='right'>{item.salePrice}</TableCell>
                <TableCell align='right'>{item.gelPrice}</TableCell>
                <TableCell align='right'>{item.saleGelPrice}</TableCell>
                <TableCell align='right'>{item.image}</TableCell>
                <TableCell align='right'>{item.availability}</TableCell>
                <TableCell align='right'>{item.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <MyModal
        open={open}
        handleClose={handleClose}
        type={modalType}
        items={items}
      />
      <div className='fetch-buttons'>
        <FetchButton
          color={'error'}
          width={'250px'}
          height={'80px'}
          type={'delete'}
          function={() => {
            handleOpen();
            setModalType('delete');
          }}
        />
        <FetchButton
          width={'250px'}
          height={'80px'}
          type={'edit'}
          function={() => {
            handleOpen();
            setModalType('edit');
          }}
        />
        <FetchButton
          color={'success'}
          width={'250px'}
          height={'80px'}
          type={'add'}
          function={() => {
            setModalType('add');
            handleOpen();
          }}
        />
      </div>
    </div>
  );
};
