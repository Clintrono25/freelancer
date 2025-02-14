import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import * as Constant from '../constants/globalConstant';
import Header from '../components/Header';
import styles from '../styles/Style';
import JobCategoryCard from './JobCategoryCard';
import ServiceCategoryCard from './ServiceCategoryCard';
import ServiceProviderCard from './ServiceProviderCard';
import {useIsFocused} from '@react-navigation/native';
import JobByCountryCard from './JobByCountryCard';
import * as Animatable from 'react-native-animatable';
import ServicesListCard from './ServicesListCard';
import FormButton from '../components/FormButton';
import {updateVerified} from '../redux/AuthSlice';
import {useSelector, useDispatch} from 'react-redux';
import {
  updateLanguageTaxonomy,
  updateLocationTaxonomy,
  updateSkillTaxonomy,
  updateCategoryTaxonomy,
  updateServiceCategoryTaxonomy,
  updateDurationTaxonomy,
  updateCountryTaxonomy,
  updatePortfolioCategoriesTaxonomy,
  updatePortfolioTagTaxonomy,
  updateEnglishLevelTaxonomy,
  updateDeliveryTaxonomy,
  updateResponseTimeTaxonomy,
  updateFreelancerTypeTaxonomy,
  updateProjectLevelTaxonomy,
  updateIndustrialExperienceTaxonomy,
  updateSpecializationTaxonomy,
  updateDepartmentsTaxonomy,
  updateNoEmployesTaxonomy,
  updateHourlyRateTaxonomy,
  updateProjectExperience,
  updateReasonTypeTaxonomy,
} from '../redux/GlobalStateSlice';
import {updateSetting} from '../redux/SettingSlice';
import JobCategorySkeleton from './JobCategorySkeleton';
import ServiceProviderSkeleton from './ServiceProviderSkeleton';
import ServiceCategorySkeleton from './ServiceCategorySkeleton';
import JobByCountrySkeleton from './JobByCountrySkeleton';
import ServiceListSkeleton from './ServiceListSkeleton';
import Translation from '../constants/Translation';

const Home = ({navigation}) => {
  const isFocused = useIsFocused();
  const token = useSelector(state => state.value.token);
  const userInfo = useSelector(state => state.value.userInfo);
  const locationTaxonomy = useSelector(state => state.global.locationTaxonomy);
  const searchView = useSelector(state => state.global.serach);
  const settings = useSelector(state => state.setting.settings);
  const dispatch = useDispatch();

  const [loader, setLoader] = useState(false);
  const [jobCategories, setJobCategories] = useState([]);
  const [serviceCategories, setServicesCategories] = useState([]);
  const [freelancers, setFreelancers] = useState([]);
  const [countryJobs, setCountryJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [services, setServices] = useState([]);
  const [refreshList, setRefreshList] = useState(false);
  const [jobCategoriesSpinner, setJobCategoriesSpinner] = useState(true);
  const [serviceCategoriesSpinner, setServiceCategoriesSpinner] =
    useState(true);
  const [serviceSpinner, setServiceSpinner] = useState(true);
  const [countryJobsSpinner, setCountryJobsSpinner] = useState(true);
  const [freelancersSpinner, setFreelancersSpinner] = useState(true);

  useEffect(() => {
    if (isFocused) {
      getSettings();
      getJobCategories();
      getServiceCategories();
      getFeaturedFreelancers();
      getFeaturedServices();
      getJobsByCountry();
      getLocationTaxonomy();
      getLanguageTaxonomy();
      getCategoryTaxonomy();
      getServiceCategoryTaxonomy();
      getSkillTaxonomy();
      getDuartionTaxonomy();
      getCountryTaxonomy();
      getEnglishLevelTaxonomy();
      getResponseTimeTaxonomy();
      getDeliveryTaxonomy();
      getFreelancerTypeTaxonomy();
      getPortfolioCategories();
      getProjectLevelTaxonomy();
      getDepartmentsTaxonomy();
      getNoEmployesTaxonomy();
      getPortfolioTags();
      getIndustrialExperienceTaxonomy();
      getSpecializationTaxonomy();
      getHourlyRateTaxonomy();
      getProjectExperience();
      getReasonTaxonomy();
      if (token != null) {
        getIdentityVerification();
      }
    }
  }, [isFocused]);
  const getSettings = async () => {
    return fetch(Constant.BaseUrl + 'user/get_theme_settings', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        // console.log('updateSetting', responseJson);
        dispatch(updateSetting(responseJson));
      })
      .catch(error => {
        console.error(error);
      });
  };
  const getLocationTaxonomy = async () => {
    return fetch(
      Constant.BaseUrl + 'taxonomies/get_taxonomy?taxonomy=locations',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        // console.log('Taxonomy Location', responseJson);
        dispatch(updateLocationTaxonomy(responseJson));
      })
      .catch(error => {
        setLoader(false);
        console.error(error);
      });
  };
  const getLanguageTaxonomy = async () => {
    return fetch(
      Constant.BaseUrl + 'taxonomies/get_taxonomy?taxonomy=languages',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        // console.log('Taxonomy Languages', responseJson);
        dispatch(updateLanguageTaxonomy(responseJson));
      })
      .catch(error => {
        setLoader(false);
        console.error(error);
      });
  };
  const getCategoryTaxonomy = async () => {
    return fetch(
      Constant.BaseUrl + 'taxonomies/get_taxonomy?taxonomy=project_cat',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        // console.log('Taxonomy Category', responseJson);
        dispatch(updateCategoryTaxonomy(responseJson));
      })
      .catch(error => {
        setLoader(false);
        console.error(error);
      });
  };
  const getServiceCategoryTaxonomy = async () => {
    return fetch(
      Constant.BaseUrl + 'taxonomies/get_taxonomy?taxonomy=service_categories',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        // console.log('Taxonomy ServiceCategory', responseJson);
        dispatch(updateServiceCategoryTaxonomy(responseJson));
      })
      .catch(error => {
        setLoader(false);
        console.error(error);
      });
  };
  const getSkillTaxonomy = async () => {
    return fetch(Constant.BaseUrl + 'taxonomies/get_taxonomy?taxonomy=skills', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        // console.log('Taxonomy Skills', responseJson);
        dispatch(updateSkillTaxonomy(responseJson));
      })
      .catch(error => {
        setLoader(false);
        console.error(error);
      });
  };
  const getDuartionTaxonomy = async () => {
    return fetch(
      Constant.BaseUrl + 'taxonomies/get_taxonomy?taxonomy=durations',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        // console.log('Taxonomy Duartion', responseJson);
        dispatch(updateDurationTaxonomy(responseJson));
      })
      .catch(error => {
        setLoader(false);
        console.error(error);
      });
  };
  const getCountryTaxonomy = async () => {
    return fetch(Constant.BaseUrl + 'taxonomies/get_list?list=woo_countries', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        // console.log('Taxonomy Countries', responseJson);
        dispatch(updateCountryTaxonomy(responseJson));
      })
      .catch(error => {
        setLoader(false);
        console.error(error);
      });
  };
  const getEnglishLevelTaxonomy = async () => {
    return fetch(
      Constant.BaseUrl + 'taxonomies/get_taxonomy?taxonomy=english_level',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        // console.log('Taxonomy EnglishLevelTaxonomy', responseJson);
        dispatch(updateEnglishLevelTaxonomy(responseJson));
      })
      .catch(error => {
        setLoader(false);
        console.error(error);
      });
  };
  const getResponseTimeTaxonomy = async () => {
    return fetch(
      Constant.BaseUrl + 'taxonomies/get_taxonomy?taxonomy=response_time',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        // console.log('Taxonomy ResponseTimeTaxonomy', responseJson);
        dispatch(updateResponseTimeTaxonomy(responseJson));
      })
      .catch(error => {
        setLoader(false);
        console.error(error);
      });
  };
  const getDeliveryTaxonomy = async () => {
    return fetch(
      Constant.BaseUrl + 'taxonomies/get_taxonomy?taxonomy=delivery',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        // console.log('Taxonomy DeliveryTaxonomy', responseJson);
        dispatch(updateDeliveryTaxonomy(responseJson));
      })
      .catch(error => {
        setLoader(false);
        console.error(error);
      });
  };
  const getFreelancerTypeTaxonomy = async () => {
    return fetch(
      Constant.BaseUrl + 'taxonomies/get_taxonomy?taxonomy=freelancer_type',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        // console.log('Taxonomy FreelancerTypeTaxonomy', responseJson);
        dispatch(updateFreelancerTypeTaxonomy(responseJson));
      })
      .catch(error => {
        setLoader(false);
        console.error(error);
      });
  };
  const getDepartmentsTaxonomy = async () => {
    return fetch(
      Constant.BaseUrl + 'taxonomies/get_taxonomy?taxonomy=department',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        // console.log('Taxonomy department', responseJson);
        dispatch(updateDepartmentsTaxonomy(responseJson));
      })
      .catch(error => {
        setLoader(false);
        console.error(error);
      });
  };
  const getNoEmployesTaxonomy = async () => {
    return fetch(Constant.BaseUrl + 'taxonomies/get_list?list=no_of_employes', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        // console.log('Taxonomy no_of_employes', responseJson);
        dispatch(updateNoEmployesTaxonomy(responseJson));
      })
      .catch(error => {
        setLoader(false);
        console.error(error);
      });
  };
  const getIndustrialExperienceTaxonomy = async () => {
    return fetch(
      Constant.BaseUrl + 'taxonomies/get_taxonomy?taxonomy=project_experience',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        // console.log('Taxonomy industrial', responseJson);
        dispatch(updateIndustrialExperienceTaxonomy(responseJson));
      })
      .catch(error => {
        setLoader(false);
        console.error(error);
      });
  };
  const getSpecializationTaxonomy = async () => {
    return fetch(
      Constant.BaseUrl + 'taxonomies/get_taxonomy?taxonomy=wt-specialization',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        // console.log('Taxonomy specialization', responseJson);
        dispatch(updateSpecializationTaxonomy(responseJson));
      })
      .catch(error => {
        setLoader(false);
        console.error(error);
      });
  };
  const getPortfolioCategories = async () => {
    return fetch(
      Constant.BaseUrl +
        'taxonomies/get_taxonomy?taxonomy=portfolio_categories',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        // console.log('Taxonomy PortfolioCategories', responseJson);
        dispatch(updatePortfolioCategoriesTaxonomy(responseJson));
      })
      .catch(error => {
        setLoader(false);
        console.error(error);
      });
  };
  const getPortfolioTags = async () => {
    return fetch(
      Constant.BaseUrl + 'taxonomies/get_taxonomy?taxonomy=portfolio_tags',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        // console.log('Taxonomy PortfolioTagTaxonomy', responseJson);
        dispatch(updatePortfolioTagTaxonomy(responseJson));
      })
      .catch(error => {
        setLoader(false);
        console.error(error);
      });
  };
  const getJobCategories = async () => {
    return fetch(
      Constant.BaseUrl + 'list/get_categories?category_type=project',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        setJobCategoriesSpinner(false);
        setJobCategories(responseJson);
      })
      .catch(error => {
        setLoader(false);
        console.error(error);
      });
  };
  const getServiceCategories = async () => {
    return fetch(
      Constant.BaseUrl + 'list/get_categories?category_type=service',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        setServiceCategoriesSpinner(false);
        setServicesCategories(responseJson);
      })
      .catch(error => {
        setLoader(false);
        console.error(error);
      });
  };
  const getFeaturedFreelancers = async () => {
    return fetch(
      Constant.BaseUrl +
        'listing/get_freelancers?listing_type=search&show_users=5&profile_id=',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        setFreelancersSpinner(false);
        setFreelancers(responseJson.freelancers.freelancers_data);
      })
      .catch(error => {
        setLoader(false);
        console.error(error);
      });
  };
  const getFeaturedServices = async () => {
    return fetch(
      Constant.BaseUrl + 'services/get_services?listing_type=latest',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        // console.log('responseJson service', responseJson);
        setServiceSpinner(false)
        setServices(responseJson.services);
      })
      .catch(error => {
        setLoader(false);
        console.error(error);
      });
  };

  const getJobsByCountry = async () => {
    return fetch(
      Constant.BaseUrl +
        'listing/country_listing?profile_id=' +
        userInfo.id +
        '&show_posts=10&page_number=1',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        // console.log('responseJson JobsByCountry', responseJson);
        setCountryJobs(responseJson);
        setCountryJobsSpinner(false);
      })
      .catch(error => {
        setLoader(false);
        console.error(error);
      });
  };
  const getProjectLevelTaxonomy = async () => {
    return fetch(
      Constant.BaseUrl + 'taxonomies/get_taxonomy?taxonomy=project_levels',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        dispatch(updateProjectLevelTaxonomy(responseJson));
      })
      .catch(error => {
        setLoader(false);
        console.error(error);
      });
  };
  const getReasonTaxonomy = async () => {
    return fetch(Constant.BaseUrl + 'taxonomies/get_list?list=reason_type', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        dispatch(updateReasonTypeTaxonomy(responseJson));
      })
      .catch(error => {
        setLoader(false);
        console.error(error);
      });
  };
  const getHourlyRateTaxonomy = async () => {
    return fetch(
      Constant.BaseUrl + 'taxonomies/get_taxonomy?taxonomy=hourly_rate',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        // console.log('Taxonomy HourlyRate', responseJson);
        dispatch(updateHourlyRateTaxonomy(responseJson));
      })
      .catch(error => {
        setLoader(false);
        console.error(error);
      });
  };
  const getProjectExperience = async () => {
    return fetch(
      Constant.BaseUrl + 'taxonomies/get_taxonomy?taxonomy=project_experience',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        // console.log('Taxonomy updateProjectExperience', responseJson);
        dispatch(updateProjectExperience(responseJson));
      })
      .catch(error => {
        setLoader(false);
        console.error(error);
      });
  };
  const getIdentityVerification = () => {
    fetch(Constant.BaseUrl + 'user/identity_status?user_id=' + userInfo.id, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token.authToken,
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        // console.log('responseJson Identity ', responseJson);
        if (responseJson.identity_verification == 1) {
          dispatch(updateVerified('yes'));
        } else if (responseJson.identity_verification == 2) {
          dispatch(updateVerified('pending'));
        } else {
          dispatch(updateVerified('no'));
        }
        // setLoader(false);
      })
      .catch(error => {
        console.error('identity', error);
      });
  };

  return (
    <SafeAreaView style={{backgroundColor: '#eee', flex: 1}}>
      <Header backColor={Constant.whiteColor} iconColor={'#1C1C1C'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.homeStartExploringParentStyle}>
          <Text style={styles.homeHeadingStyle}>
            {Translation.homeExploring}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('FreelancersList')}
            style={styles.homeFreelancerParentStyle}>
            <View style={styles.homeFreelancerHeadingParentStyle}>
              <View>
                <Text style={styles.homeFreelancerHeadingTextStyle}>
                  {Translation.homeFreelancers}
                </Text>
                <Text style={styles.homeFreelancerTaglineTextStyle}>
                  {Translation.homeVerifiedProfessionals}
                </Text>
              </View>
              <Image
                resizeMode="contain"
                style={styles.homeImageStyle}
                source={require('../../assets/images/Placeholder.png')}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.homeButtonsParentStyle}>
            {settings.user_meta.access_type.job_access == 'yes' && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('JobListing', {
                    backDisable: false,
                    searchWithNav: false,
                  })
                }
                style={[
                  styles.homeJobButtonParentStyle,
                  {
                    width:
                      settings.user_meta.access_type.service_access == 'yes'
                        ? '32%'
                        : '49%',
                  },
                ]}>
                <Image
                  resizeMode="contain"
                  style={styles.homeImageStyle}
                  source={require('../../assets/images/Placeholder1.png')}
                />
                <Text style={styles.homeJobTextStyle}>
                  {Translation.homeJobs}
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EmployerListing', {backDisable: false})
              }
              style={[
                styles.homeEmployerParentStyle,
                {
                  width:
                    settings.user_meta.access_type.service_access == 'yes'
                      ? settings.user_meta.access_type.job_access == 'yes'
                        ? '32%'
                        : '49%'
                      : '49%',
                },
              ]}>
              <Image
                resizeMode="contain"
                style={styles.homeImageStyle}
                source={require('../../assets/images/Placeholder2.png')}
              />
              <Text style={styles.homeEmployerButtonStyle}>
                {Translation.homeEmployers}
              </Text>
            </TouchableOpacity>
            {settings.user_meta.access_type.service_access == 'yes' && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ServicesList', {searchWithNav: false})
                }
                style={[
                  styles.homeServicesParentStyle,
                  {
                    width:
                      settings.user_meta.access_type.job_access == 'yes'
                        ? '32%'
                        : '49%',
                  },
                ]}>
                <Image
                  resizeMode="contain"
                  style={styles.homeImageStyle}
                  source={require('../../assets/images/Placeholder3.png')}
                />
                <Text style={styles.homeServiceTextStyle}>
                  {Translation.homeServices}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        {settings.jobs_search_filters.job_categories == 'enable' &&
          settings.user_meta.access_type.job_access == 'yes' && (
            <View style={styles.homeJobCategoryParentStyle}>
              <Text style={styles.homeHeadingStyle}>
                {Translation.homeTopCategories}
              </Text>
              <View style={{flexDirection: 'row'}}>
                {jobCategoriesSpinner ? (
                  <>
                    <JobCategorySkeleton />
                    <JobCategorySkeleton />
                    <JobCategorySkeleton />
                  </>
                ) : (
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    showsVerticalScrollIndicator={false}
                    data={jobCategories}
                    keyExtractor={(x, i) => i.toString()}
                    renderItem={({item, index}) => (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('JobListing', {
                            backDisable: false,
                            jobCategory: item.slug,
                            searchWithNav: true,
                            type: 'category',
                          })
                        }>
                        <JobCategoryCard item={item} />
                      </TouchableOpacity>
                    )}
                  />
                )}
              </View>

              <FormButton
                buttonTitle={Translation.homeAllCategories}
                backgroundColor={'#F7F8FC'}
                textColor={'#676767'}
                onPress={() =>
                  navigation.navigate('JobListing', {
                    backDisable: false,
                    searchWithNav: false,
                  })
                }
              />
            </View>
          )}
        {settings.user_meta.access_type.service_access == 'yes' && (
          <View style={styles.homeServiceCategoriesParentStyle}>
            <Text style={styles.homeHeadingStyle}>
              {Translation.homeExploreServices}
            </Text>
            <View style={{flexDirection: 'row'}}>
              {serviceCategoriesSpinner ? (
                <>
                  <ServiceCategorySkeleton />
                  <ServiceCategorySkeleton />
                </>
              ) : (
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  showsVerticalScrollIndicator={false}
                  data={serviceCategories}
                  keyExtractor={(x, i) => i.toString()}
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('ServicesList', {
                          Category: item.slug,
                          searchWithNav: true,
                        })
                      }>
                      <ServiceCategoryCard item={item} />
                    </TouchableOpacity>
                  )}
                />
              )}
            </View>

            <FormButton
              onPress={() =>
                navigation.navigate('ServicesList', {searchWithNav: false})
              }
              buttonTitle={Translation.homeAllServices}
              backgroundColor={'#F7F8FC'}
              textColor={'#676767'}
            />
          </View>
        )}

        <View style={styles.homeServiceProviderCardParentStyle}>
          <Text style={styles.homeHeadingStyle}>
            {Translation.homeFeaturedService}
          </Text>
          <View style={{flexDirection: 'row'}}>
            {freelancersSpinner ? (
              <>
                <ServiceProviderSkeleton width={300} />
                <ServiceProviderSkeleton width={300} />
              </>
            ) : (
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                showsVerticalScrollIndicator={false}
                data={freelancers}
                keyExtractor={(x, i) => i.toString()}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('FreelancerDetail', {item: item})
                    }>
                    <ServiceProviderCard width={300} item={item} />
                  </TouchableOpacity>
                )}
              />
            )}
          </View>

          <FormButton
            onPress={() => navigation.navigate('FreelancersList')}
            buttonTitle={Translation.homeAllFreelancers}
            backgroundColor={'#F7F8FC'}
            textColor={'#676767'}
          />
        </View>

        {settings.user_meta.access_type.service_access == 'yes' && (
          <View style={styles.homeServicesCardParentStyle}>
            <Text style={styles.homeHeadingStyle}>{Translation.homeFeaturedText}</Text>
            <View style={{flexDirection: 'row'}}>
              {serviceSpinner ? (
                <>
                  <ServiceListSkeleton width={300} />
                  <ServiceListSkeleton width={300} />
                  <ServiceListSkeleton width={300} />
                </>
              ) : (
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  showsVerticalScrollIndicator={false}
                  data={services}
                  keyExtractor={(x, i) => i.toString()}
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('ServiceDetail', {
                          item: item,
                          edit: false,
                        })
                      }>
                      <ServicesListCard width={300} item={item} />
                    </TouchableOpacity>
                  )}
                />
              )}
            </View>

            <FormButton
              onPress={() =>
                navigation.navigate('ServicesList', {searchWithNav: false})
              }
              buttonTitle={Translation.homeAllServices}
              backgroundColor={'#F7F8FC'}
              textColor={'#676767'}
            />
          </View>
        )}

        {settings.user_meta.access_type.job_access == 'yes' && (
          <View style={styles.homeJobbyCountryCardParentStyle}>
            <Text style={styles.homeHeadingStyle}>{Translation.homeJobsCountry}</Text>
            <View style={{flexDirection: 'row'}}>
              {countryJobsSpinner ? (
                <>
                  <JobByCountrySkeleton />
                  <JobByCountrySkeleton />
                  <JobByCountrySkeleton />
                  <JobByCountrySkeleton />
                  <JobByCountrySkeleton />
                  <JobByCountrySkeleton />
                </>
              ) : (
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  showsVerticalScrollIndicator={false}
                  data={countryJobs}
                  keyExtractor={(x, i) => i.toString()}
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('JobListing', {
                          backDisable: false,
                          searchWithNav: true,
                          country: item,
                          type: 'country',
                        })
                      }>
                      <JobByCountryCard item={item} />
                    </TouchableOpacity>
                  )}
                />
              )}
            </View>

            <FormButton
            onPress={() =>
              navigation.navigate('JobListing', {
                backDisable: false,
                searchWithNav: false,
              })
            }
              buttonTitle={Translation.homeExploreJobs}
              backgroundColor={'#F7F8FC'}
              textColor={'#676767'}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
