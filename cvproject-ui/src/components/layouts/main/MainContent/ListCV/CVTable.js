import React, { useState, memo } from 'react'
import { Table, Tag, Space, Button, Flex, Popconfirm, Form, Card, Col, Drawer, Divider, Row, Tooltip } from 'antd'
import { DeleteOutlined, EditOutlined, SaveOutlined, CloseCircleOutlined, EyeOutlined } from '@ant-design/icons'
import moment from 'moment';


import EditableCell from '../EditCV/EditableCell';
import { myCVListApi } from '~/api/MyCVListApi';
import handleLogError from '~/utils/HandleError';
import { useAuth } from 'react-oidc-context';
import { filterService } from '~/utils/FilterService';


const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
        <p className="site-description-item-profile-p-label">{title}:</p>
        {content}
    </div>
);

function CVTable({ dataSource, rowSelection, onDelete, pagination, loading, editProps, getColumnSearchProps }) {
    const auth = useAuth();
    const [isOpenDrawer, setOpenDrawer] = useState(false);
    const [info, setInfo] = useState({});

    const showDrawer = async (key) => {
        setOpenDrawer(true);
        await myCVListApi.getCvById(key)
            .then((response) => {
                console.log(response.data);
                setInfo(response.data);
            }).catch((error) => {
                handleLogError(error);
            });
    }

    const closeDrawer = () => {
        setOpenDrawer(false);
        setInfo({});
    }


    // Columns and data
    const columns = [
        {
            title: 'Full Name',
            dataIndex: 'full_name',
            key: 'full_name',
            fixed: 'left',
            width: '10%',
            ...getColumnSearchProps('full_name'),
            editable: true,
        },
        {
            title: 'DOB',
            dataIndex: 'date_of_birth',
            key: 'date_of_birth',
            width: '12%',
            editable: true,
            render: (text) => moment(text).format('DD-MM-YYYY'),

        },
        {
            title: 'University',
            dataIndex: 'university',
            key: 'university',
            filters: filterService.getUniversityFilter(),
            onFilter: (value, record) => {
                return record.university.indexOf(value) === 0;
            },
            ellipsis: true,
            editable: true,

        },
        {
            title: 'Training System',
            dataIndex: 'training_system',
            key: 'training_system',
            width: '12%',
            ...getColumnSearchProps('training_system'),
            editable: true,
        },
        {
            title: 'GPA',
            dataIndex: 'gpa',
            key: 'gpa',
            width: '8%',
            ...getColumnSearchProps('gpa'),
            sorter: (a, b) => a.gpa - b.gpa,
            editable: true,

        },
        {
            title: 'Apply Position',
            dataIndex: 'apply_position',
            key: 'apply_position',
            width: '12%',
            filterSearch: true,
            filters: filterService.getPositionFilter(),
            editable: true,
        },
        {
            title: 'Skills',
            dataIndex: 'skill',
            key: 'skill',
            width: '14%',
            editable: true,
            onFilter: (value, record) => record.status.indexOf(value) === 0,
            ellipsis: true,
            render: (text) => {
                const split = text.split(',');
                const result = split.map((item) => item = item.trim());
                return (
                    <>
                        <Flex gap={'4px'} wrap='wrap'>
                            {result.map((item, index) => {
                                return (
                                    <Tag key={index} color={'purple'}>
                                        {item.toUpperCase()}
                                    </Tag>
                                )
                            })}
                        </Flex>
                    </>
                )
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: '10%',
            render(status) {
                let color;
                switch (status) {
                    case "PASS":
                        color = 'green';
                        break;
                    case 'NOTPASS':
                        color = 'red';
                        break;
                    default:
                        color = 'purple';
                        break;
                }

                return (
                    <Tag color={color}>
                        {status}
                    </Tag>
                )
            },
            filters: filterService.getStatusFilter(),
            onFilter: (value, record) => record.status.includes(value),
            ellipsis: true,
        },
        {
            title: 'Link CV',
            dataIndex: 'link_cv',
            key: 'link_cv',
            width: '10%',
            render(link) {
                return (
                    <Tooltip title={link}>
                        <a href={link}>{link}</a>
                    </Tooltip>
                )
            },
            editable: true,
            ellipsis: true,

        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 150,
            align: 'center',
            render: (_, record) => {
                const editable = editProps.isEditing(record);
                return (

                    <Space size="middle">
                        {editable ? (
                            <>
                                <Button icon={<SaveOutlined />} type="primary" onClick={() => editProps.save(record.key)}>
                                </Button>
                                <Popconfirm title="Chắc chưa?" onConfirm={editProps.cancel}>
                                    <Button danger icon={<CloseCircleOutlined />}></Button>
                                </Popconfirm>
                            </>
                        ) : (
                            <>
                                <Button
                                    icon={<EditOutlined />}
                                    disabled={editable === ''}
                                    onClick={() => editProps.edit(record)}
                                    type='primary' shape='circle'></Button>
                                <Button
                                    icon={<DeleteOutlined />}
                                    type='default' shape='circle'
                                    danger onClick={() => onDelete(record.key)}></Button>
                                <Button
                                    icon={<EyeOutlined />}
                                    onClick={() => showDrawer(record.key)}
                                ></Button>

                            </>
                        )}
                    </Space>
                );
            },

        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'gpa' ? 'number' : col.dataIndex === 'date_of_birth' ? 'date' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: editProps.isEditing(record),
            }),
        };
    });
    const cvs = () => {
        if (dataSource === undefined || dataSource === null) return [];
        return dataSource.map((cv) => ({
            key: cv.id,
            skill: cv.skill,
            university: cv.university,
            gpa: cv.gpa,
            status: cv.status,
            full_name: cv.full_name,
            date_of_birth: cv.date_of_birth,
            training_system: cv.training_system,
            create_by: cv.create_by,
            apply_position: cv.apply_position,
            link_cv: cv.link_cv
        }));
    }

    const datas = cvs();
    return (
        <>
            <Card>
                {/* <div className='mb-4'>
                    <Button onClick={clearAll}>Clear filters and sorters</Button>
                </div> */}
                <Form form={editProps.form} component={false}>
                    <Table
                        rootClassName='cv-table'
                        rowSelection={rowSelection}
                        dataSource={datas}
                        columns={mergedColumns}
                        rowClassName="editable-row"
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        scroll={{
                            scrollToFirstRowOnChange: false,
                            x: 1600,
                            y: 420
                        }}
                        pagination={pagination}
                        loading={loading}
                    />
                </Form>
            </Card>

            <Drawer width={640} placement="right" closable={false} onClose={closeDrawer} open={isOpenDrawer}>
                <p
                    className="site-description-item-profile-p"
                    style={{
                        marginBottom: 24,
                    }}
                >
                    User Profile
                </p>
                <p className="site-description-item-profile-p">Personal</p>
                <Row>
                    <Col span={12}>
                        <DescriptionItem title="Full Name" content={info.fullName} />
                    </Col>
                    <Col span={12}>
                        <DescriptionItem title="Birthday" content={moment(info.dateOfBirth).format('DD-MM-YYYY')} />
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <DescriptionItem title="University" content={info.university} />
                    </Col>
                    <Col span={12}>
                        <DescriptionItem title="GPA" content={info.gpa} />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <DescriptionItem title="Training System" content={info.trainingSystem} />
                    </Col>
                </Row>
                <Divider />
                <p className="site-description-item-profile-p">Company</p>
                <Row>
                    <Col span={24}>
                        <DescriptionItem title="Position" content={info.applyPosition} />
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <DescriptionItem title="Supervisor" content={auth.user?.profile.preferred_username} />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <DescriptionItem
                            title="Skills"
                            content={info.skill}
                        />
                    </Col>
                </Row>
                <Divider />
                <p className="site-description-item-profile-p">Contacts</p>
                <Row>
                    <Col span={24}>
                        <DescriptionItem
                            title="CV"
                            content={
                                <a href={info.linkCV}>
                                    {info.linkCV}
                                </a>
                            }
                        />
                    </Col>
                </Row>
            </Drawer>
        </>
    )
}

export default memo(CVTable)