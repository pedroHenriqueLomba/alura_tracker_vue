import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import TarefasView from "../views/TarefasView.vue"
import ProjetosView from "../views/ProjetosView.vue"
import FormularioProjetos from "@/views/projetos/FormularioProjetos.vue";
import ListaProjetos from "@/views/projetos/ListaProjetos.vue";

const rotas: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'TarefasView',
        component: TarefasView
    },
    {
        path: '/projetos',
        name: 'ProjetosView',
        component: ProjetosView,
        children: [
            {
                path: '',
                name: 'ListaProjetos',
                component: ListaProjetos
            },
            {
                path: 'novo',
                name: 'NovoProjeto',
                component: FormularioProjetos
            },
            {
                path: ':id',
                name: 'EditarProjeto',
                component: FormularioProjetos,
                props: true
            },
        ]
    },
];

const roteador = createRouter(
    {
        history: createWebHashHistory(),
        routes: rotas
    }
);

export default roteador;