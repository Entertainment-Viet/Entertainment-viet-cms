import React, { memo, useEffect, useState } from 'react';
import { SimpleGrid, Flex, Box } from '@chakra-ui/react';
// import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import PageSpinner from 'components/PageSpinner';
// import AdvancedTable from 'components/AdvancedTable';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { API_ACHIEVEMENT } from 'constants/api';
import { post, del } from 'utils/request';
import { useForm } from 'react-hook-form';
import Form from 'components/Form';
import DynamicInput from 'components/DynamicInputFormV2';
import InputCustomV2 from 'components/Controls/InputCustomV2';
import TrashCan from 'components/Icon/TrashCan';
import { loadAchievement } from './slice/actions';
import saga from './slice/saga';
import reducer from './slice/reducer';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectData,
} from './slice/selectors';
// import { globalMessages } from '../../App/globalMessage';

const key = 'Achievement';
const Achievement = ({ data, loading, onLoadData }) => {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  // const { t } = useTranslation();
  const [achievement, setAchievement] = useState();
  const [achievementList, setAchievementList] = useState([]);
  const userId = window.localStorage.getItem('uid');
  useEffect(() => {
    onLoadData();
  }, []);
  useEffect(() => {
    setAchievementList(data);
  }, [data]);
  const onSubmit = async () => {
    let newAchievementData = achievement && achievement;
    newAchievementData =
      achievement &&
      // eslint-disable-next-line no-shadow
      newAchievementData.map(({ key, value }) => ({
        name: key,
        rate: value,
      }));
    const conCattedAchievement = achievementList.concat(newAchievementData);
    setAchievementList(conCattedAchievement);
    return Promise.all(
      newAchievementData.map(achievementItem =>
        post(`${API_ACHIEVEMENT}`, achievementItem, userId).then(res => {
          if (res >= 400 && res <= 500) {
            alert("Try again! Can't add achievement");
            console.log('Error code', res);
          }
        }),
      ),
    );
  };

  async function handleDelete(indexSelected) {
    const removedData = achievementList.filter(
      (_, index) => index !== indexSelected,
    );
    const id = achievementList[indexSelected].uid;
    await del(`${API_ACHIEVEMENT}/${id}`, {}, userId).then(res1 => {
      if (res1 > 400) {
        console.log('error');
      } else {
        setAchievementList(removedData);
      }
    });
  }
  return !loading && data ? (
    <SimpleGrid
      sx={{
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Form title="Achievement" isSubmitting={isSubmitting}>
          <DynamicInput setDynamicData={setAchievement} />
          {achievementList.length > 0 &&
            achievementList.map((item, index) => (
              <Flex
                height="40px"
                alignItems="center"
                marginTop="20px"
                key={`achievement_${item.id}`}
              >
                <InputCustomV2 name="name" value={item.name} />
                <Box marginRight="4px" marginLeft="4px" />
                <InputCustomV2 name="rate" type="number" value={item.rate} />
                <Box _hover={{ cursor: 'pointer' }}>
                  <TrashCan size="2.5rem" onClick={() => handleDelete(index)} />
                </Box>
              </Flex>
            ))}
        </Form>
      </form>
    </SimpleGrid>
  ) : (
    <PageSpinner />
  );
};

Achievement.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onLoadData: PropTypes.func,
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  data: makeSelectData(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: () => {
      dispatch(loadAchievement());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Achievement);
