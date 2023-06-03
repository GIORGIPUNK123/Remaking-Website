import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AdminPanelAddModal } from './modals/AdminPanelAddModal';
import { AdminPanelDeleteModal } from './modals/AdminPanelDeleteModal';
import { AdminPanelImageModal } from './modals/AdminPanelImageModal';
import { AdminPanelTable } from './AdminPanelTable';
import {
  Box,
  Button,
  Text,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';
import { Loading } from '../Loading';
import { getMacs } from '../../functions/fetchFuncions';
import { useDispatch, useSelector } from 'react-redux';
import { GeneralItemType, ItemType, UserType } from '../../types';
import { getItems } from '../../store/slices/itemsSlice';
import { getGeneralItems } from '../../store/slices/generalItemsSlice';
import { AppDispatch } from '../../store/store';
export const AdminPanel = (props: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  // const { colorMode, toggleColorMode } = useColorMode();
  // console.log(colorMode);
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const {
    isOpen: isOpenImage,
    onOpen: onOpenImage,
    onClose: onCloseImage,
  } = useDisclosure();
  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onClose: onCloseAdd,
  } = useDisclosure();
  const currentUserObj = useSelector(
    (state: {
      currentUser: { currentUser: UserType; error: boolean; loading: boolean };
    }) => state.currentUser
  );

  const languageObj = useSelector(
    (state: { language: { lang: 'en' | 'ge' } }) => state.language
  );
  const itemsObj = useSelector(
    (state: {
      items: { items: ItemType[]; error: boolean; loading: boolean };
    }) => state.items
  );

  if (isLoading === true) {
    return <Loading />;
  }
  useEffect(() => {
    if (Object.keys(currentUserObj.currentUser).length === 0) {
      navigate('../login');
    } else if (currentUserObj.currentUser.rank !== 'admin') {
      navigate('/');
    }
  });
  const [activeImage, setActiveImage] = useState();
  const [activeCat, setActiveCat] = useState('mac');
  return (
    <>
      <div className='admin-panel'>
        <div className='admin-panel-top'>
          <h1 className='admin-panel-heading'>Admin Panel</h1>
        </div>
        <Box w='80%' mx='20%' mb='4'>
          <Button
            size='md'
            colorScheme={activeCat === 'mac' ? 'green' : 'blue'}
            mr='6'
            onClick={() => {
              setActiveCat('mac');
            }}
          >
            Macs
          </Button>
          <Button
            size='md'
            colorScheme={activeCat === 'iphone' ? 'green' : 'blue'}
            mr='6'
            onClick={() => {
              setActiveCat('iphone');
            }}
          >
            Iphones
          </Button>
          <Button
            size='md'
            colorScheme={activeCat === 'airpods' ? 'green' : 'blue'}
            mr='6'
            onClick={() => {
              setActiveCat('airpods');
            }}
          >
            Airpods
          </Button>
        </Box>
        <Button
          colorScheme='blue'
          variant='solid'
          style={{
            height: '50px',
            position: 'absolute',
            top: '70px',
            right: '10%',
            width: '150px',
            fontSize: '2vh',
          }}
          className='admin-panel-refresh'
          isLoading={itemsObj.loading}
          onClick={() => {
            dispatch(getItems());
          }}
        >
          Refresh
        </Button>
        {/* <Button
          onClick={toggleColorMode}
          style={{ position: 'absolute', top: '70px', left: '10%' }}
        >
          Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
        </Button> */}
        <AdminPanelTable
          setActiveImage={setActiveImage}
          onOpen={onOpenImage}
          itemsArr={itemsObj.items.filter((el) => el.category === activeCat)}
        />
        <AdminPanelDeleteModal
          onClose={onCloseDelete}
          isOpen={isOpenDelete}
          activeCat={activeCat}
        />
        <AdminPanelImageModal
          onClose={onCloseImage}
          isOpen={isOpenImage}
          activeImage={activeImage}
        />
        <AdminPanelAddModal onClose={onCloseAdd} isOpen={isOpenAdd} />
        <div
          style={{
            display: 'flex',
            height: '100%',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <div className='fetch-buttons'>
            <Button
              variant='solid'
              colorScheme='red'
              style={{
                height: '80px',
                width: '250px',
                fontSize: '2vh',
              }}
              onClick={() => {
                onOpenDelete();
              }}
            >
              Delete
            </Button>
            <Button
              variant='solid'
              colorScheme='green'
              style={{
                height: '80px',
                width: '250px',
                fontSize: '2vh',
              }}
              onClick={() => {
                onOpenAdd();
              }}
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
