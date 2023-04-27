import { defineStore } from "pinia";
import { computed, ref } from "vue";
// import type { Permission } from "@/types";
import axios from "axios";

export const useTeamStore = defineStore("teams", () => {
    const layout = ref(true)

    function CreateTeamsTest() {
        console.log('Это сработало!');
    }

    // Вывести все коллективвы с руководителсями
    async function fetchTeams(): Promise<any> {
        const res = await axios.get('/api/teams')
        const data = res.data

        return data
    }

    // data will be returned as index 0 - is data, index 1 is count
    async function fetchTeamsOfDirection(direction: number = -1, type_team = "teams"): Promise<any> {
        const res = await axios.get('/api/teams/direction', { params: { id_parent: direction, type_team: type_team } })
        const data = res.data
       
        return data
    }


    async function fetchCreateTeams() {
        await axios.get('/api')
            .then((respose: any) => {
                // Умные действия
            })
    }
    async function fetchTeam(id: number): Promise<any> {
        const res = await axios.get('/api/teams/' + id + '/users')
        const data = res.data
        console.log(data)
        return data
    }
    async function fetchRequisition(user_id: number): Promise<any> {
        const res = await axios.get('/api/teams/' + user_id + '/requisition')
        const data = res.data
    
        return data
        
    }

    async function createTeam(title: String, description: String,
        shortname: String, userId: Number) {

        let responseMsg = "сохранено"

        //create team
        await axios.post("api/teams", {
            title: title,
            description: description,
            shortname: shortname,
            userID: userId
        })
            .catch((err) => {
                if (err.response) {
                    responseMsg = err.response.data.message[0]
                }
            })

        return responseMsg
    }

    // Переключение Switch_toggle в стр. Коллективы и Мероприятия
    function setLayout(res: any) {
        this.layout = res;
    }

    const menu_items = [
        {
            id: 1, title: 'Набор', hidden: true, menu_types: [
                { id: 1, title: 'Набор открыт' },
                { id: 2, title: 'Набор закрыт' },
            ]
        },
        {
            id: 2, title: 'Вид деятельности', hidden: true, menu_types: [
                { id: 1, title: 'Научная деятельность' },
                { id: 2, title: 'Учебная деятельность' },
                { id: 3, title: 'Научная деятельность' },
                { id: 4, title: 'Спортивная деятельность' },
                { id: 5, title: 'Культурно-творческая деятельность' },
            ]
        },
    ]

    return {
        CreateTeamsTest,
        fetchCreateTeams,
        fetchTeams,
        createTeam,
        setLayout,
        fetchTeamsOfDirection,
        fetchTeam,
        fetchRequisition,

        layout,
        menu_items
    }
});
