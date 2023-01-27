import { Grid, Paper, Table, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import React from 'react'
import { useParams } from 'react-router-dom'
import { AmbulanceStoreInterface } from '../../models/ambulanceStoreModels/IAmbulanceStore'
import { AmbulancesInterface } from '../../models/ambulance_system_models/ambulance'
import { GetAmbulanceWithID, ListAmbulanceStores } from '../../services/ambulanceStoreSystemServices/AmbulanceStoreHttpClientServices'
import { GetAmbulanceByID } from '../../services/ambulance_system_services/HttpClientService'

// added styles
import "./styles.css"

export default function AmbulanceStoreManage() {

    let { id } = useParams()

    // Get a Ambulance Store form database to state
    const [ambMed, setAmbMed] = React.useState<AmbulanceStoreInterface[]>([])

    // Get data to state
    const getAmbulanceStores = async () => {
        let res = await ListAmbulanceStores()
        if (res.data) {
            setAmbMed(res.data)
        }
    }
    const convertDateFormat = (date: Date) => {
        const newDate = new Date(date)
        return `${newDate.getDate()} / ${newDate.getMonth() + 1} / ${newDate.getFullYear()}   ${newDate.getHours()} : ${newDate.getMinutes()} น.`
    }


    // Get Ambulance form database and save to state
    const [ambulance, setAmbulance] = React.useState<AmbulancesInterface>()

    // Get data to state
    const getAmbulance = async () => {
        let res = await GetAmbulanceWithID(id)
        if (res) {

            setAmbulance(res)
        }
    }

    React.useEffect(() => {
        getAmbulanceStores()
        getAmbulance()
    }, [])

    const submit = () => {
        console.log(ambMed)
    }

    return (
        <Container maxWidth="lg">
            <Paper sx={{ p: 4 }}>
                <Grid container spacing={3} >
                    <Grid item xs={12}>
                        <Typography
                            component="h2"
                            variant='h5'
                            gutterBottom
                            color="#233333"
                        >ข้อมูลยาบนรถพยาบาลหมายเลขทะเบียน <span className='clp-color'>{ambulance?.Clp}</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ display: "flex" }}>
                        <Typography
                            component="h2"
                            variant='subtitle1'
                            gutterBottom
                            color="#233333">
                            เลือกรถพยาบาลที่ต้องการจัดการ
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <hr />
                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableCell>ชื่อยา</TableCell>
                                    <TableCell>จำนวนที่เหลือ</TableCell>
                                    <TableCell>ผู้เพิ่มข้อมูล</TableCell>
                                    <TableCell>วันเพิ่มข้อมูล</TableCell>
                                    <TableCell>แก้ไขข้อมูล</TableCell>
                                </TableHead>

                                {/* Body */}
                                <TableBody>
                                    {
                                        ambMed.filter((amb) => {
                                            return String(amb.AmbulanceID) === id
                                        }).map((item) => (
                                            <TableRow
                                                key={item.ID}>
                                                <TableCell>
                                                    {item.Medicine.MedicineName}
                                                </TableCell>
                                                <TableCell>
                                                    {item.Amount} {item.Medicine.MeasureUnit}
                                                </TableCell>
                                                <TableCell>
                                                    {item.Employee.Name} &nbsp;{item.Employee.Surname}
                                                </TableCell>
                                                <TableCell>
                                                    {convertDateFormat(item.Date)}
                                                </TableCell>
                                                <TableCell>
                                                    {/* ไว้ใส่ปุ่มแก้ไขข้อมูล */}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={12} sx={{ display: "flex" , justifyContent:"center"}}>
                        <Button onClick={submit}>
                            เบิกยาเข้าสู่รถพยาบาล
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}