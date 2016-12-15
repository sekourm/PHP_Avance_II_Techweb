<?php

namespace AppBundle\Controller;

use AppBundle\Entity\techTasksByUsers;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\GetSetMethodNormalizer;
use Symfony\Component\HttpFoundation\Response;
use AppBundle\Entity\techTasks;
use AppBundle\Entity\techSubTasks;

class TasksController extends Controller
{
    public function createTasksAction()
    {
        $tasks = new techTasks();

        $encoders = array(new XmlEncoder(), new JsonEncoder());
        $normalizers = array(new GetSetMethodNormalizer());
        $serializer = new Serializer($normalizers, $encoders);

        $post = $this->getRequest()->getContent();
        $post = json_decode($post);

        $em = $this->getDoctrine()->getManager();

        $tasks->setName($post->nameTasks);
        $tasks->setTasksByCategories($em->getReference('AppBundle\Entity\techCategories', $post->categorieId));
        $em->persist($tasks);
        $em->flush();

        $response = new Response($serializer->serialize(array('message' => 'Création de tâche réussit', 'creation' => 'true'), 'json'));
        return $response;
    }


    public function updateTasksInCategoriesAction()
    {
        $encoders = array(new XmlEncoder(), new JsonEncoder());
        $normalizers = array(new GetSetMethodNormalizer());
        $serializer = new Serializer($normalizers, $encoders);

        $post = $this->getRequest()->getContent();
        $post = json_decode($post);

        $em = $this->getDoctrine()->getManager();

        $tasks = $em->getRepository('AppBundle:techTasks')->find($post->taskId);

        if(!$tasks)
        {
            $response = new Response($serializer->serialize(array('message'=>'false'), 'json'));
            return $response;
        }

        $tasks->setTasksByCategories($em->getReference('AppBundle\Entity\techCategories', $post->categorieId));
        $em->flush();

        $response = new Response($serializer->serialize(array('message'=>'true'), 'json'));
        return $response;
    }

    public function modifyNameTasksAction()
    {
        $encoders = array(new XmlEncoder(), new JsonEncoder());
        $normalizers = array(new GetSetMethodNormalizer());
        $serializer = new Serializer($normalizers, $encoders);

        $post = $this->getRequest()->getContent();
        $post = json_decode($post);

        $em = $this->getDoctrine()->getManager();

        $tasks = $em->getRepository('AppBundle:techTasks')->find($post->taskId);

        if(!$tasks)
        {
            $response = new Response($serializer->serialize(array('message'=>'false'), 'json'));
            return $response;
        }

        $tasks->setName($post->nameTasks);
        $em->flush();

        $response = new Response($serializer->serialize(array('message'=>'true'), 'json'));
        return $response;
    }

    public function createSubTasksAction()
    {
        $subTasks = new techSubTasks();

        $encoders = array(new XmlEncoder(), new JsonEncoder());
        $normalizers = array(new GetSetMethodNormalizer());
        $serializer = new Serializer($normalizers, $encoders);

        $post = $this->getRequest()->getContent();
        $post = json_decode($post);

        $em = $this->getDoctrine()->getManager();


        $subTasks->setDescription($post->nameSubTasks);
        $subTasks->setSubTasksByTasks($em->getReference('AppBundle\Entity\techTasks', $post->taskId));

        $em->persist($subTasks);
        $em->flush();

        $subTasksId = $subTasks->getId();

        $response = new Response($serializer->serialize(array('message' => 'Création de sous tâche réussit', 'creation' => 'true', 'id' => $subTasksId), 'json'));
        return $response;
    }

    public function updateCheckedSubTasksAction()
    {
        $encoders = array(new XmlEncoder(), new JsonEncoder());
        $normalizers = array(new GetSetMethodNormalizer());
        $serializer = new Serializer($normalizers, $encoders);

        $post = $this->getRequest()->getContent();
        $post = json_decode($post);

        $em = $this->getDoctrine()->getManager();

        $subTasks = $em->getRepository('AppBundle:techSubTasks')->find($post->subTaskId);

        if(!$subTasks)
        {
            $response = new Response($serializer->serialize(array('message'=>'update check echoué'), 'json'));
            return $response;
        }

        $subTasks->setChecked($post->isChecked);
        $em->flush();

        $response = new Response($serializer->serialize(array('message'=>'update check avec succées'), 'json'));
        return $response;
    }



    public function addUserInTasksAction()
    {
        $encoders = array(new XmlEncoder(), new JsonEncoder());
        $normalizers = array(new GetSetMethodNormalizer());
        $serializer = new Serializer($normalizers, $encoders);

        $post = $this->getRequest()->getContent();
        $post = json_decode($post);
        $taskId = $post->taskId;
        $userId =$post->userId;

        $em = $this->getDoctrine()->getManager();

        $techTasksByUsers = $em->getRepository('AppBundle:techTasksByUsers')->findBy(array());

        for($i=0;$i<count($techTasksByUsers);$i++)
        {
            if ($techTasksByUsers[$i]->getUsersByTasks()->getId() == $userId && $techTasksByUsers[$i]->getTasksByTasksInUsers()->getId() == $taskId){
                $response = new Response($serializer->serialize(array('message'=>'alreadey inside','creation' => 'false'), 'json'));
                return $response;
            }
        }

        $insert = new techTasksByUsers();
        $insert->setUsersByTasks($em->getReference('AppBundle\Entity\techUsers',$userId));
        $insert->setTasksByTasksInUsers($em->getReference('AppBundle\Entity\techTasks',$taskId));
        $em->persist($insert);
        $em->flush();

        $response = new Response($serializer->serialize(array('message'=>'update check avec succées','creation' => 'true'),'json'));
        return $response;
    }


}