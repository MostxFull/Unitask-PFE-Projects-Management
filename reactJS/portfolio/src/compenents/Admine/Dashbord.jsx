import { useState, useEffect } from 'react';
import { Card } from "../ui/card.jsx";
import { CardContent } from "../ui/card.jsx";
import { Progress } from "../ui/progress.jsx";
import { Button } from "../ui/button.jsx";

export default function Dashbord() {
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [unassignedStudentsCount, setUnassignedStudentsCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [teachersRes, studentsRes] = await Promise.all([
                    fetch('https://mostxfull-unitask-pfe-projects-management.hf.space/user/getAllEnsieg'),
                    fetch('https://mostxfull-unitask-pfe-projects-management.hf.space/user/getAllEtudiants')
                ]);

                const teachersData = await teachersRes.json();
                const studentsData = await studentsRes.json();

                // Calcul des étudiants assignés
                const assignedStudentIds = new Set();
                teachersData.forEach(teacher => {
                    teacher.groups.forEach(group => {
                        group.members.forEach(member => {
                            const studentId = typeof member === 'object' ? member.id : member;
                            assignedStudentIds.add(studentId);
                        });
                    });
                });

                // Calcul des étudiants non encadrés
                const unassigned = studentsData.length;

                setTeachers(teachersData);
                setStudents(studentsData);
                setUnassignedStudentsCount(unassigned);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const getPriorityBadgeStyle = (priority) => {
        const styles = {
            High: 'bg-red-100 text-red-800',
            Medium: 'bg-yellow-100 text-yellow-800',
            Low: 'bg-green-100 text-green-800'
        };
        return styles[priority] || 'bg-gray-100 text-gray-800';
    };

    // Calcul des statistiques
    const totalTeachers = teachers.length;
    const totalProjects = teachers.reduce((sum, teacher) => sum + teacher.groups.length, 0);
    const totalStudents = teachers.reduce((sum, teacher) =>
        sum + teacher.groups.reduce((groupSum, group) => groupSum + group.members.length, 0), 0);

    // Transformation des données des projets
    const projects = teachers.flatMap(teacher =>
        teacher.groups.map(group => {
            const completedTasks = group.taches.filter(t => t.status === "Completed").length;
            const totalTasks = group.taches.length;
            const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

            return {
                name: group.name,
                supervisor: `${teacher.firstName} ${teacher.lastName}`,
                priority: totalTasks > 5 ? "High" : totalTasks > 2 ? "Medium" : "Low",
                progress: progress,
                members: group.members.length
            };
        })
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
            <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8 overflow-auto min-h-screen">
                <div className="max-w-7xl mx-auto">
                    {/*<div className="flex justify-end mb-6">*/}
                    {/*    <Button variant="outline" className="rounded-full">Notif</Button>*/}
                    {/*</div>*/}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {[totalProjects, totalStudents, unassignedStudentsCount, totalTeachers].map((stat, index) => (
                            <Card key={index} className="hover:shadow-lg transition-shadow duration-200 ease-in-out shadow-md">
                                <CardContent className="p-5">
                                    <h3 className="text-base font-medium text-gray-600 mb-2">
                                        {['Projets', 'Étudiants Encadrés', 'Étudiants', 'Enseignants'][index]}
                                    </h3>
                                    <p className="text-3xl font-bold text-gray-900 mb-1">
                                        {stat}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-xl font-bold text-gray-900 tracking-tight mb-6">Projets Actifs</h2>
                        <div className="w-full border-b border-gray-200 pb-3 grid grid-cols-5 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                            <span>Nom du Projet</span>
                            <span>Encadrant</span>
                            <span>Priorité</span>
                            <span>Membres</span>
                            <span>Progrès</span>
                        </div>
                        <div className="space-y-4 mt-4">
                            {projects.map((project, index) => (
                                <div key={index} className="grid grid-cols-5 items-center py-4 hover:bg-gray-50 rounded-lg transition-colors duration-150 ease-in-out">
                                    <span className="font-medium text-gray-900">{project.name}</span>
                                    <span className="text-gray-600">{project.supervisor}</span>
                                    <span>
                                        <span className={`px-3 py-1 rounded-full text-sm ${getPriorityBadgeStyle(project.priority)}`}>
                                            {project.priority}
                                        </span>
                                    </span>
                                    <span className="text-gray-600">{project.members}</span>
                                    <div className="flex items-center space-x-3">
                                        <Progress
                                            value={project.progress}
                                            className="h-2.5 rounded-full bg-gray-200 flex-grow"
                                            indicatorColor="bg-indigo-600"
                                        />
                                        <span className="text-sm text-gray-600 w-12">{project.progress}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}